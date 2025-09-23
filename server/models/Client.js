// server/models/Client.js

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    projectsAssigned: {
        type: Number,
        default: 0,
    },
    // The user field links a client to a specific user (the freelancer)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates a relationship with the User model
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;