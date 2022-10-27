const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

// create image for review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    const revImgs = await review.getReviewImages();

    if (revImgs.length >= 10) {
        res.status(403).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        });
    }

    const newImg = await ReviewImage.create({ reviewId, url });
    const img = await ReviewImage.findOne({
        where: { id: newImg.id }, 
        attributes: { exclude: ['reviewId', 'createdAt', 'updatedAt'] }
    });

    res.json(img);
});

// get reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const reviews = await user.getReviews();
    if (!reviews.length) {res.json({message: "No reviews for this user"})}

    const reviewArr = await Promise.all(reviews.map(async rev => {
        const revData = rev.dataValues;

        revData.User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };

        const spot = await Spot.findOne({
            where: {
                id: revData.spotId
            },
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        });

        const prevImgs = await SpotImage.findAll({
            where: {
                spotId: spot.id,
            },
            attributes: ['id', 'url']
        });

        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });

        spot.dataValues.previewImage = prevImg.dataValues.url

        const imgArr = await Promise.all(prevImgs.map(async img => img.dataValues));

        revData.Spot = spot.dataValues;
        revData.ReviewImages = imgArr;
        
        return revData;
    }));

    const resObj = { Reviews: reviewArr };
    res.json(resObj);
});


// edit review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const id = req.params.reviewId;
    const rev = await Review.findByPk(id);
    const { review, stars } = req.body;

    if (!rev) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    rev.update({review, stars});

    res.json(rev)
});

// delete review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const id = req.params.reviewId;
    const rev = await Review.findByPk(id);

    if (!rev) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    await Review.destroy({
        where: {
            id: rev.id
        }
    });

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;
