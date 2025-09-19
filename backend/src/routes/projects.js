import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const router = express.Router();

// Get all projects for user
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new project
router.post('/', [
  body('name').trim().isLength({ min: 1 }),
  body('color').optional().isHexColor()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, color = '#3B82F6' } = req.body;
    const userId = req.user._id;

    const project = new Project({
      name,
      color,
      userId
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 1 }),
  body('color').optional().isHexColor()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await Project.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { name, color } = req.body;

    if (name !== undefined) project.name = name;
    if (color !== undefined) project.color = color;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove project reference from all tasks
    await Task.updateMany(
      { projectId: project._id, userId: req.user._id },
      { $unset: { projectId: 1 } }
    );

    await Project.findByIdAndDelete(project._id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project with task count
router.get('/:id/stats', async (req, res) => {
  try {
    const project = await Project.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const totalTasks = await Task.countDocuments({ 
      projectId: project._id, 
      userId: req.user._id 
    });

    const completedTasks = await Task.countDocuments({ 
      projectId: project._id, 
      userId: req.user._id, 
      completed: true 
    });

    res.json({
      project,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
