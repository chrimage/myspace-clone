const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware and Routes
const authMiddleware = require('./middleware/auth');
const registerRoutes = require('./routes/registerRoutes');
const protectedRoutes = require('./routes/protectedRoutes'); // Add your protected routes here

dotenv.config();
const app = express();

// Middleware for serving static files
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(registerRoutes);

// Apply auth middleware only to protected routes
app.use('/api', authMiddleware, protectedRoutes); // Example usage

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

