const express = require('express');

const { Spot } = require('../../db/models');

const router = express.Router();

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

router.get('/current', async (req, res, next) => {
    const { user } = req;
    console.log(user);
})

module.exports = router;
