// server/models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'canceled'],
        default: 'pending',
    },
    tasks: [
        {
            taskName: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
    ],
    // The user field links a project to a specific user (the freelancer)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates a relationship with the User model
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;