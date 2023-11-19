const express = require('express');
const UserPage = require('../models/UserPage');
const auth = require('../middleware/auth');
const router = express.Router();

// Create User Page Route
router.post('/userpage', auth, async (req, res) => {
    try {
        const userPage = new UserPage({
            ...req.body,
            userId: req.user._id
        });
        await userPage.save();
        res.status(201).send(userPage);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get User Page Route
router.get('/userpage/:userId', async (req, res) => {
    try {
        const userPage = await UserPage.findOne({ userId: req.params.userId });
        if (!userPage) {
            return res.status(404).send();
        }
        res.send(userPage);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;

