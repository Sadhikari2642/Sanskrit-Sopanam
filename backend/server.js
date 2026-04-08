const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sanskrit Portal API is running' });
});

app.listen(PORT, () => {
  console.log(`Sanskrit Portal Backend running on http://localhost:${PORT}`);
});
