
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Notification = require('../models/Notification');

// Get all tasks assigned to or created by user
router.get('/', auth, async (req, res) => {
const tasks = await Task.find({
$or: [{ assignedTo: req.user.id }, { createdBy: req.user.id }]
});
res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
const { title, description, dueDate, priority, status, assignedTo } = req.body;
const task = new Task({
title, description, dueDate, priority, status,
createdBy: req.user.id,
assignedTo: assignedTo || req.user.id
});
await task.save();

// Notify assigned user if not self
if (assignedTo && assignedTo !== req.user.id) {
await Notification.create({
user: assignedTo,
message: `A new task "${title}" has been assigned to you.`
});
}

res.status(201).json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
await Task.findByIdAndDelete(req.params.id);
res.json({ msg: 'Task deleted' });
});

// Assign task
router.post('/:id/assign', auth, async (req, res) => {
const { userId } = req.body;
const task = await Task.findByIdAndUpdate(req.params.id, { assignedTo: userId }, { new: true });
await Notification.create({
user: userId,
message: `Task "${task.title}" has been assigned to you.`
});
res.json(task);
});

// Search/filter tasks
router.get('/search', auth, async (req, res) => {
const { q, status, priority, dueDate } = req.query;
const filter = {
$or: [{ assignedTo: req.user.id }, { createdBy: req.user.id }]
};
if (q) filter.$or.push({ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') });
if (status) filter.status = status;
if (priority) filter.priority = priority;
if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };
const tasks = await Task.find(filter);
res.json(tasks);
});

module.exports = router;
