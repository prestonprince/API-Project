const express = require('express');

const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// get reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const reviews = await user.getReviews();

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

module.exports = router;
