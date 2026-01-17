const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Travel Booking API',
    features: [
      'Book flights',
      'Reserve hotels',
      'Explore destinations',
      'Manage bookings'
    ],
    apiVersion: '1.0.0',
    endpoints: {
      destinations: '/api/destinations',
      hotels: '/api/hotels',
      flights: '/api/flights',
      bookings: '/api/bookings',
      auth: '/api/auth'
    }
  });
});

module.exports = router;
