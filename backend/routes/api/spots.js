const express = require('express');

const { Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op, MACADDR } = require('sequelize');
const { query } = require('express');

const router = express.Router();

//get all bookings for a spot by spotId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { user } = req;

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    if (user.id !== spot.ownerId) {
        const resObj = {};
        const bookings = await spot.getBookings({attributes: ['spotId', 'startDate', 'endDate']});

        resObj.Bookings = bookings;
        res.json(resObj)
    } else {
        const resObj = {};
        const bookings = await spot.getBookings();
        const bookingsArr = await Promise.all(bookings.map(async book => {
            const bookData = book.dataValues;
            bookData.User = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            };

            return bookData;
        }));
        resObj.Bookings = bookingsArr;

        res.json(resObj)
    };
});

// create booking from spotid
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    const bookings = await spot.getBookings();
    const bookingsArr = await Promise.all(bookings.map(async book => book.dataValues));
    
    for (const booking of bookingsArr) {
        if ((startDate >= booking.startDate && startDate <= booking.endDate) ||
            (endDate >= booking.startDate && endDate <= booking.endDate)) {
                res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
        }
    }

    const newBooking = await Booking.create({ 
        spotId,
        userId: user.id,
        startDate,
        endDate
     });

     res.json(newBooking)
})

//create spot img
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (spot) {
        const newSpotImg = await SpotImage.create({ spotId, url, preview });
        const img = await SpotImage.findOne({
            where: {
                id: newSpotImg.id
            },
            attributes: ['id', 'url', 'preview']
        });
    
        res.json(img);
    } else {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
});

// get all reviews by spotId
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    const reviews = await spot.getReviews();
    const resObj = {};
    const revArr = await Promise.all(reviews.map(async rev => {
        const revData = rev.dataValues;
        revData.User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };

        const imgs = await ReviewImage.findAll({ where: {reviewId: rev.id}, attributes: ['id', 'url'] });

        revData.ReviewImages = imgs

        return revData
    }));
    
    resObj.Reviews = revArr

    res.json(resObj)
});

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars are required")
        .isInt()
        .isIn([1, 2, 3, 4, 5])
        .withMessage("Stars must be an integer from 1 to 5"),
        handleValidationErrors
];

// create review for spot based on spotid
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const userId = user.id;
    const { review, stars } = req.body;

    const existingRev = await Review.findOne({
        where: {
            spotId,
            userId
        }
    });

    const spot = await Spot.findByPk(spotId);

    //check if spot exists
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    
    // check if review for spot by user already exists
    if (existingRev) {
        return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        });
    };

    // check body of req
    if (!review || !stars || stars > 5 || stars < 1) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5"
            }
        })
    };

    const rev = await Review.create({spotId, userId, review, stars});

    res.json(rev)
})

//get spots of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    const spots = await user.getSpots();

    const spotArr = await Promise.all(spots.map(async spot => {
        const spotData = spot.dataValues;

         //add avgrating prop
         const allReviews = await spot.getReviews();
         let sumStars = 0;
         for (const review of allReviews) {
             const stars = review.dataValues.stars;
             sumStars += stars;
         };
         const avgRating = sumStars / allReviews.length;
         spotData.avgRating = avgRating;

           //add previewimage prop
        const allImages = await spot.getSpotImages({where: {preview: true}});
        for (const image of allImages) {
            const url = image.dataValues.url;
            spotData.previewImage = url
        };

        return spotData;
    }));

    const resObj = {};
    resObj.Spots = spotArr;

    res.json(resObj);
});

// query filters helper func
const queryFilters = (queryObj) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = queryObj;

    const filterOBJ = {}

    const errObj = {};
    if (minLat && isNaN(+minLat)) {
        errObj.minLat = "Minimum latitude is invalid";
        filterOBJ.errors = { ...errObj }
    };

    if (maxLat && isNaN(+maxLat)) {
        errObj.maxLat = "Maximum latitude is invalid";
        filterOBJ.errors = { ...errObj }
    };

    if (minLng && isNaN(+minLng)) {
        errObj.minLng = "Minimum longitude is invalid";
        filterOBJ.errors = { ...errObj }
    };

    if (maxLng && isNaN(+maxLng)) {
        errObj.maxLng = "Maximum longitude is invalid";
        filterOBJ.errors = { ...errObj }
    };

    if (minPrice && +minPrice < 0) {
        errObj.minPrice = "Minimum price must be greater than or equal to 0";
        filterOBJ.errors = { ...errObj }
    };

    if (maxPrice && +maxPrice < 0) {
        errObj.maxPrice = "Maximum price must be greater than or equal to 0";
        filterOBJ.errors = { ...errObj };
    }

    const where = {};

    if (minLat) {
        where.lat = { [Op.gt]: minLat }
        filterOBJ.where = { ...where }
    };

    if (maxLat) {
        where.lat = { [Op.lt]: maxLat }
        filterOBJ.where = { ...where }
    };

    if (minLat && maxLat) {
        where.lat = { [Op.between]: [minLat, maxLat] }
        filterOBJ.where = { ...where }
    };

    if (minLng) {
        where.lng = { [Op.gte]: minLng }
        filterOBJ.where = { ...where }
    };

    if (maxLng) {
        where.lng = { [Op.lte]: maxLng }
        filterOBJ.where = { ...where }
    };

    if (minLng && maxLng) {
        where.lng = { [Op.between]: [minLng, maxLng] }
        filterOBJ.where = { ...where }
    };

    if (minPrice) {
        where.price = { [Op.gte]: minPrice }
        filterOBJ.where = { ...where }
    };

    if (maxPrice) {
        where.price = { [Op.lte]: maxPrice }
        filterOBJ.where = { ...where }
    };

    if (minPrice && maxPrice) {
        where.price = { [Op.between]: [minPrice, maxPrice] }
        filterOBJ.where = { ...where }
    };

    return filterOBJ;
}

// get all spots
router.get('/', async (req, res, next) => {
    let { page, size } = req.query;
    
    if (!page) page = 1;
    if (!size) size = 20;

    if (+page > 10) page = 10;
    if (+size > 20) size = 20;

    if (+page < 1) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 1"
            }
        });
    };

    if (+size < 1) {
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                size: "size must be greater than or equal to 1"
            }
        });
    };

    let pagination = {};
    if (+page >= 1 && +size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    };

    // query filters
    const {where, errors} = queryFilters(req.query);

    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors
        })
    }

    const spots = await Spot.findAll({where, ...pagination});
    // get avgrating and previewimage for each spot
    for (const spot of spots) {
        const spotData = spot.dataValues;

        // get reviews for current spot, returns array of reviews
        const allReviews = await spot.getReviews();
        
        // get each review for current spot
        let sumStars = 0;
        for (const review of allReviews) {
            const stars = review.dataValues.stars;
            sumStars += stars;
        };

        const avgRating = sumStars / allReviews.length;
        spotData.avgRating = avgRating;

        // array of all images that are preview for current spot
        const allImages = await spot.getSpotImages({where: {preview: true}});
        for (const image of allImages) {
            const url = image.dataValues.url;
            spotData.previewImage = url
        }
    };

    const resObj = {};
    resObj.Spots = spots;
    resObj.page = page;
    resObj.size = size

    res.json(resObj);
});

// validate spotCreation
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('latitude is required')
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required')
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

//create spot 
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    const ownerId = user.dataValues.id;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.json(newSpot);
});

// get spot deets from id
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    } else {
        const spotData= spot.dataValues;

        // get reviews for current spot, returns array of reviews
        const allReviews = await spot.getReviews();
        
        // get each review for current spot
        let sumStars = 0;
        for (const review of allReviews) {
            const stars = review.dataValues.stars;
            sumStars += stars;
        };

        const avgRating = sumStars / allReviews.length;
        spotData.numReviews = allReviews.length;
        spotData.avgStarRating = avgRating;

        // array of all images that are preview for current spot
        const allImages = await spot.getSpotImages({ attributes: ['id', 'url', 'preview'] });
        const imgArr = await Promise.all(allImages.map(async img => {
            const imgData = img.dataValues;
            return imgData
        }));
        
        spotData.SpotImages = imgArr;

        const owner = await spot.getUser({
            where: {id: spot.ownerId},
            attributes: ['id', 'firstName', 'lastName']
        });
        
        spotData.Owner = owner;

        res.json(spotData)
    }
});

// edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);
    
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    spot.update({
        ...req.body
    })

    res.json(spot)
});

// delete spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    } else {
        // await spot.destroy();

        await Spot.destroy({
            where: {
                id: id
            }
        });

        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    };
})

module.exports = router;
