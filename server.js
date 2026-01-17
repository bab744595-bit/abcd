require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/travel-app';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    console.log('⚠ Continuing without database (using fallback mode)');
  }
};

connectDB();

// Import routes
const homeRoutes = require('./routes/home');
const destinationsRoutes = require('./routes/destinations');
const hotelsRoutes = require('./routes/hotels');
const flightsRoutes = require('./routes/flights');
const bookingsRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Backend is running', 
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Route endpoints
app.use('/api/home', homeRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n✓ Backend server is running on http://localhost:${PORT}`);
  console.log(`✓ CORS enabled for ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`✓ All routes are ready for navigation`);
  console.log(`✓ JWT authentication enabled\n`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`\n✗ Port ${PORT} is already in use.\n` +
      ` - Option A: stop the process currently using port ${PORT}\n` +
      ` - Option B: set a different port via environment variable, e.g. PORT=5001`);
    console.error('Windows hint: run `netstat -ano | findstr :' + PORT + '` to find the PID, then `taskkill /PID <pid> /F`.');
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});
