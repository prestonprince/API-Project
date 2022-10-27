const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// get current users bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;
    const bookings = await Booking.findAll({ where: {userId: user.id} });
    const bookingsArr = await Promise.all(bookings.map(async book => {
        const bookData = book.dataValues;

        const spot = await Spot.findOne({
            where: {id: bookData.spotId},
            attributes: {
                exclude: ['description', 'updatedAt', 'createdAt']
            }
        });
        
        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        
        spot.dataValues.previewImage = prevImg.url;

        bookData.Spot = spot.dataValues

        return bookData
    }));

    const resObj= { Bookings: bookingsArr };
    res.json(resObj);
});

module.exports = router;
