// server/models/Invoice.js

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client', // Links the invoice to a specific client
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Overdue'],
        default: 'Pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links the invoice to the freelancer
    },
}, {
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;