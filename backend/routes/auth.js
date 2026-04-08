const express = require('express');
const router = express.Router();

// In-memory user store (resets on server restart)
const users = [];

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  // Check if email already exists
  const existing = users.find(u => u.email === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'This email is already registered.' });
  }

  // Create user
  const user = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.toLowerCase(),
    password,
    joined: new Date().toLocaleDateString()
  };

  users.push(user);

  res.status(201).json({
    message: 'Account created successfully!',
    user: { id: user.id, name: user.name, email: user.email, joined: user.joined }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  // Find user
  const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }

  res.json({
    message: 'Login successful!',
    user: { id: user.id, name: user.name, email: user.email, joined: user.joined }
  });
});

module.exports = router;
