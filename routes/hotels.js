const express = require('express');
const router = express.Router();

const hotels = [
  {
    id: 1,
    name: 'Luxury Palace Hotel',
    destination: 'Paris',
    rating: 4.9,
    price: '₹20,750/night',
    amenities: ['WiFi', 'Gym', 'Pool', 'Restaurant', '24/7 Service'],
    rooms: 150,
    image: 'luxury-palace.jpg',
    currency: 'INR'
  },
  {
    id: 2,
    name: 'City Center Inn',
    destination: 'Tokyo',
    rating: 4.6,
    price: '₹14,940/night',
    amenities: ['WiFi', 'Gym', 'Cafe', 'Room Service'],
    rooms: 100,
    image: 'city-center.jpg',
    currency: 'INR'
  },
  {
    id: 3,
    name: 'Grand Manhattan Hotel',
    destination: 'New York',
    rating: 4.7,
    price: '₹18,260/night',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Business Center'],
    rooms: 200,
    image: 'grand-manhattan.jpg',
    currency: 'INR'
  },
  {
    id: 4,
    name: 'Desert Oasis Resort',
    destination: 'Dubai',
    rating: 4.8,
    price: '₹16,600/night',
    amenities: ['WiFi', 'Pool', 'Spa', 'Multiple Restaurants', 'Beach Access'],
    rooms: 300,
    image: 'desert-oasis.jpg',
    currency: 'INR'
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: hotels.length,
    data: hotels
  });
});

router.get('/destination/:destination', (req, res) => {
  const destination = req.params.destination;
  const filteredHotels = hotels.filter(h => 
    h.destination.toLowerCase() === destination.toLowerCase()
  );
  
  res.status(200).json({
    success: true,
    destination: destination,
    count: filteredHotels.length,
    data: filteredHotels
  });
});

router.get('/:id', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  
  res.status(200).json({
    success: true,
    data: hotel
  });
});

module.exports = router;
