const express = require('express');
const User = require('../models/User');
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await user.comparePassword(req.body.password)) {
            return res.status(401).send({ error: 'Login failed!' });
        }

        const token = user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

