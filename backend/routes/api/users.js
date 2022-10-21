const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, password, username });

    await setTokenCookie(res, user);

    return res.json({ user });
});

module.exports = router;