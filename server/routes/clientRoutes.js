// server/routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all clients for the logged-in user
// @route   GET /api/clients
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
    const clients = await Client.find({ user: req.user._id });
    res.json(clients);
}));

// @desc    Create a new client
// @route   POST /api/clients
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { name, companyName, email, phoneNumber } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error('Please include a name and email');
    }

    const client = new Client({
        name,
        companyName,
        email,
        phoneNumber,
        user: req.user._id, // Assign the client to the logged-in user
    });

    const createdClient = await client.save();
    res.status(201).json(createdClient);
}));

// @desc    Get a single client
// @route   GET /api/clients/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);

    if (client) {
        if (client.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to view this client');
        }
        res.json(client);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
}));

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const { name, companyName, email, phoneNumber } = req.body;
    const client = await Client.findById(req.params.id);

    if (client) {
        if (client.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to update this client');
        }
        
        client.name = name || client.name;
        client.companyName = companyName || client.companyName;
        client.email = email || client.email;
        client.phoneNumber = phoneNumber || client.phoneNumber;

        const updatedClient = await client.save();
        res.json(updatedClient);
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
}));
// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);

    if (client) {
        // Ensure the logged-in user owns the client
        if (client.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to delete this client');
        }

        await client.deleteOne();
        res.json({ message: 'Client removed' });
    } else {
        res.status(404);
        throw new Error('Client not found');
    }
}));

module.exports = router;