import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Task from '../models/Task.js';
import Project from '../models/Project.js';

const router = express.Router();

// Get all tasks for user
router.get('/', [
  query('completed').optional().isBoolean(),
  query('projectId').optional().isMongoId(),
  query('dueDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { completed, projectId, dueDate } = req.query;
    const userId = req.user._id;

    let query = { userId };

    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    if (projectId) {
      query.projectId = projectId;
    }

    if (dueDate) {
      query.dueDate = { $lte: new Date(dueDate) };
    }

    const tasks = await Task.find(query)
      .populate('projectId', 'name color')
      .sort({ dueDate: 1 })
      .exec();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('projectId', 'name color');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new task
router.post('/', [
  body('title').trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('dueDate').isISO8601(),
  body('priority').isInt({ min: 1, max: 4 }),
  body('projectId').optional().isMongoId(),
  body('reminder').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, priority, projectId, reminder } = req.body;
    const userId = req.user._id;

    // Verify project belongs to user if projectId is provided
    if (projectId) {
      const project = await Project.findOne({ _id: projectId, userId });
      if (!project) {
        return res.status(400).json({ message: 'Project not found' });
      }
    }

    const task = new Task({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      projectId,
      reminder: reminder ? new Date(reminder) : undefined,
      userId
    });

    await task.save();
    await task.populate('projectId', 'name color');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('dueDate').optional().isISO8601(),
  body('priority').optional().isInt({ min: 1, max: 4 }),
  body('projectId').optional().isMongoId(),
  body('reminder').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, dueDate, priority, projectId, reminder } = req.body;

    // Verify project belongs to user if projectId is provided
    if (projectId) {
      const project = await Project.findOne({ _id: projectId, userId: req.user._id });
      if (!project) {
        return res.status(400).json({ message: 'Project not found' });
      }
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = new Date(dueDate);
    if (priority !== undefined) task.priority = priority;
    if (projectId !== undefined) task.projectId = projectId;
    if (reminder !== undefined) task.reminder = reminder ? new Date(reminder) : undefined;

    await task.save();
    await task.populate('projectId', 'name color');

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : undefined;

    // Also toggle all subtasks
    task.subtasks.forEach(subtask => {
      subtask.completed = task.completed;
      subtask.completedAt = task.completed ? new Date() : undefined;
    });

    await task.save();
    await task.populate('projectId', 'name color');

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add subtask
router.post('/:id/subtasks', [
  body('title').trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title } = req.body;
    task.subtasks.push({ title });
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle subtask completion
router.patch('/:id/subtasks/:subtaskId', async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    subtask.completed = !subtask.completed;
    subtask.completedAt = subtask.completed ? new Date() : undefined;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
