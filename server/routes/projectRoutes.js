// server/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
    // req.user is set by the protect middleware
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
}));

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { title, description, tasks } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a project title');
    }

    const project = new Project({
        title,
        description,
        tasks,
        user: req.user._id, // Assign the project to the logged-in user
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
}));

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        // Ensure the project belongs to the logged-in user
        if (project.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to view this project');
        }
        res.json(project);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
}));

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const { title, description, status, tasks } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
        if (project.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to update this project');
        }
        
        project.title = title || project.title;
        project.description = description || project.description;
        project.status = status || project.status;
        project.tasks = tasks || project.tasks;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
}));

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        // Ensure the logged-in user owns the project
        if (project.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to delete this project');
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
}));

module.exports = router;