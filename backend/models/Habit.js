const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// base habit model
const habit = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    repeats: [{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'annually'],
    }],
    startDate: {
        type: Date,
        default: Date.now,
    },
    completedDates: [{
        type: Date,
        default: [],
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Habit', habit);