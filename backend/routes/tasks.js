const express = require('express');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const router = express.Router();

// Create Task
router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const task = await Task.create({ title, description, dueDate, priority, status, creator: req.user._id, assignee: req.user._id });
  res.status(201).json(task);
});

// Read Tasks (with search & filtering)
router.get('/', auth, async (req, res) => {
  const { search, status, priority, dueDate } = req.query;
  let query = {
    $or: [{ creator: req.user._id }, { assignee: req.user._id }]
  };
  if (search) query.$or.push({ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } });
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
  const tasks = await Task.find(query).populate('assignee creator', 'name email');
  res.json(tasks);
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (!task.creator.equals(req.user._id) && !task.assignee.equals(req.user._id))
    return res.status(403).json({ message: 'Forbidden' });
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (!task.creator.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
  await task.deleteOne();
  res.json({ message: 'Deleted' });
});

// Assign Task
router.post('/assign', auth, async (req, res) => {
  const { title, description, dueDate, priority, assignee } = req.body;
  const task = await Task.create({ title, description, dueDate, priority, creator: req.user._id, assignee });
  await Notification.create({
    user: assignee,
    message: `You have been assigned a new task: ${title}`,
  });
  res.status(201).json(task);
});

// Get notifications for logged-in user
router.get('/notifications', auth, async (req, res) => {
  const notes = await Notification.find({ user: req.user._id, read: false });
  res.json(notes);
});

module.exports = router;
