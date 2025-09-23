// server/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // New fields for the freelancer portfolio
    specialty: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    skills: [
        {
            type: String,
        },
    ],
    portfolioItems: [
        {
            imageUrl: { type: String },
            title: { type: String },
            description: { type: String },
        },
    ],
}, {
    timestamps: true,
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;