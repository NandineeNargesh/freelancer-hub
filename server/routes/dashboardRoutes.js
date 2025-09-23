// server/routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const Project = require('../models/Project');
const Client = require('../models/Client');
const Invoice = require('../models/Invoice');

// @desc    Get dashboard overview data for authenticated user
// @route   GET /api/dashboard/overview
// @access  Private
router.get('/overview', protect, asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const totalProjects = await Project.countDocuments({ user: userId });
    const pendingProjects = await Project.countDocuments({ user: userId, status: 'pending' });
    const inProgressProjects = await Project.countDocuments({ user: userId, status: 'in-progress' });
    const completedProjects = await Project.countDocuments({ user: userId, status: 'completed' });

    const totalClients = await Client.countDocuments({ user: userId });

    // Calculate total earnings from paid invoices
    const paidInvoices = await Invoice.find({ user: userId, status: 'Paid' });
    const totalEarnings = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

    // Get a monthly breakdown of paid earnings for a simple chart
    const earningsByMonth = await Invoice.aggregate([
        { $match: { user: userId, status: 'Paid' } },
        {
            $group: {
                _id: { $month: '$createdAt' },
                totalAmount: { $sum: '$amount' }
            }
        },
        { $sort: { '_id': 1 } }
    ]);
    
    // Map the result to a more readable format
    const monthlyEarnings = Array.from({ length: 12 }, (_, i) => {
        const monthData = earningsByMonth.find(item => item._id === i + 1);
        return monthData ? monthData.totalAmount : 0;
    });

    res.json({
        totalProjects,
        pendingProjects,
        inProgressProjects,
        completedProjects,
        totalClients,
        totalEarnings,
        monthlyEarnings,
    });
}));

module.exports = router;