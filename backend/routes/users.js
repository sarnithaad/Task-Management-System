const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// Get all users (for assigning tasks)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name email _id');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Existing notifications route
router.get('/notifications', auth, async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notifications);
});

module.exports = router;
