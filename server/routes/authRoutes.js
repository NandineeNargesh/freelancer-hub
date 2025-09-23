// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.specialty = req.body.specialty || user.specialty;
        user.bio = req.body.bio || user.bio;
        
        if (req.body.skills) {
            user.skills = req.body.skills.split(',').map(skill => skill.trim());
        }
        
        // Add this line to save the new portfolio items
        user.portfolioItems = req.body.portfolioItems || user.portfolioItems;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
            specialty: updatedUser.specialty,
            bio: updatedUser.bio,
            skills: updatedUser.skills,
            portfolioItems: updatedUser.portfolioItems,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));


// @desc    Get a single user's profile by ID
// @route   GET /api/auth/:id
// @access  Public (for viewing profiles)
router.get('/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

module.exports = router;