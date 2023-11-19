const mongoose = require('mongoose');

const userPageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const UserPage = mongoose.model('UserPage', userPageSchema);
module.exports = UserPage;

