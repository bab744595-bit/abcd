const express = require('express');
const router = express.Router();

const destinations = [
  {
    _id: '1',
    id: 1,
    name: 'Paris',
    country: 'France',
    description: 'The City of Light - Experience romance, art, and culture',
    image: 'paris.jpg',
    emoji: '🗼',
    attractions: 45,
    rating: 4.8,
    price: '₹99,600',
    price_per_person: 99600,
    currency: 'INR'
  },
  {
    _id: '2',
    id: 2,
    name: 'Rome',
    country: 'Italy',
    description: 'Ancient history and Renaissance charm combined',
    image: 'rome.jpg',
    emoji: '🏛️',
    attractions: 40,
    rating: 4.8,
    price: '₹91,300',
    price_per_person: 91300,
    currency: 'INR'
  },
  {
    _id: '3',
    id: 3,
    name: 'Tokyo',
    country: 'Japan',
    description: 'Modern metropolis blending tradition and innovation',
    image: 'tokyo.jpg',
    emoji: '🗾',
    attractions: 50,
    rating: 4.7,
    price: '₹124,500',
    price_per_person: 124500,
    currency: 'INR'
  },
  {
    _id: '4',
    id: 4,
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps - Iconic landmarks and vibrant culture',
    image: 'newyork.jpg',
    emoji: '🗽',
    attractions: 55,
    rating: 4.6,
    price: '₹74,700',
    price_per_person: 74700,
    currency: 'INR'
  },
  {
    _id: '5',
    id: 5,
    name: 'Sydney',
    country: 'Australia',
    description: 'Stunning harbour views and pristine beaches',
    image: 'sydney.jpg',
    emoji: '🦘',
    attractions: 35,
    rating: 4.7,
    price: '₹107,900',
    price_per_person: 107900,
    currency: 'INR'
  }
];

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: destinations.length,
    data: destinations
  });
});

router.get('/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  
  if (!destination) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  
  res.status(200).json({
    success: true,
    data: destination
  });
});

module.exports = router;
