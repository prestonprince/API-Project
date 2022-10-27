const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('../api/spots.js');
const reviewsRouter = require('../api/reviews.js');
const bookingsRouter = require('../api/bookings');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {
    const id = req.params.imageId;
    const img = await ReviewImage.findByPk(id);

    if (!img) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        });
    };

    await ReviewImage.destroy({
        where: {
            id: img.id
        }
    });

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

router.delete('/spot-images/:imageId', requireAuth, async (req, res, next) => {
    const id = req.params.imageId;
    const img = await SpotImage.findByPk(id);

    if (!img) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    };

    await SpotImage.destroy({
        where: {
            id: img.id
        }
    });

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
});

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});



module.exports = router;
