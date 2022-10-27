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

// edit booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const id = req.params.bookingId;
    console.log('this is BOOKING ID:',id)
    const booking = await Booking.findByPk(id);
    const { startDate, endDate } = req.body;

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    if (startDate > endDate) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        });
    };

    booking.update({startDate, endDate});

    res.json(booking)
});

// delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const id = req.params.bookingId;
    const booking = await Booking.findByPk(id);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    await Booking.destroy({
        where: {
            id: booking.id
        }
    });

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
