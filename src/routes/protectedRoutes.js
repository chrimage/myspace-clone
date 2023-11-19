const express = require('express');
const router = express.Router();

// Example of a protected route
router.get('/dashboard', (req, res) => {
    // Assuming req.user is set by your auth middleware
    res.send(`Welcome to your dashboard, ${req.user.name}!`);
});

// Add more protected routes here as needed

module.exports = router;

