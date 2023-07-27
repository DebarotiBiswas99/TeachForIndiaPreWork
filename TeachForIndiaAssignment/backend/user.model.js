const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weekdays: { type: [String], required: true },
  languages: { type: [String], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const express = require('express');
const router = express.Router();
const User = require('./user.model'); // Path to the user model file

// Route to fetch all registered users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;

