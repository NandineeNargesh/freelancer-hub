// server/routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Invoice = require('../models/Invoice');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all invoices for the logged-in user
// @route   GET /api/invoices
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
    const invoices = await Invoice.find({ user: req.user._id }).populate('client', 'name email');
    res.json(invoices);
}));

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { invoiceId, client, amount, status } = req.body;

    if (!invoiceId || !client || !amount) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const invoice = new Invoice({
        invoiceId,
        client,
        amount,
        status,
        user: req.user._id,
    });

    const createdInvoice = await invoice.save();
    res.status(201).json(createdInvoice);
}));

// @desc    Get a single invoice
// @route   GET /api/invoices/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id).populate('client', 'name email');

    if (invoice) {
        if (invoice.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        res.json(invoice);
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
}));

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const { invoiceId, client, amount, status } = req.body;
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
        if (invoice.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }
        
        invoice.invoiceId = invoiceId || invoice.invoiceId;
        invoice.client = client || invoice.client;
        invoice.amount = amount || invoice.amount;
        invoice.status = status || invoice.status;

        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
}));

// @desc    Delete an invoice
// @route   DELETE /api/invoices/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
        if (invoice.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await invoice.deleteOne();
        res.json({ message: 'Invoice removed' });
    } else {
        res.status(404);
        throw new Error('Invoice not found');
    }
}));

module.exports = router;