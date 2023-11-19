const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const auth = (req, res, next) => {
  try {
    // Extract the token from the request header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user's details to the request object
    req.user = decoded;

    // Continue to the next middleware function
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

