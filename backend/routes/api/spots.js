const express = require('express');

const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

//create spot img
router.post('/:spotId/images', async (req, res, next) => {
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

//get spots of current user
router.get('/current', async (req, res, next) => {
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

// get all spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
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

    res.json(resObj);
});



//create spot 
router.post('/', async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    const ownerId = user.dataValues.id;

    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    res.json(newSpot);
})

module.exports = router;
