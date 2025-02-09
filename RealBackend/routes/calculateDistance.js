const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/distance', async (req, res) => {
  const { source, destination } = req.query;
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&key=${apiKey}`);
    const distance = response.data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers
    res.send({ distance });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch distance' });
  }
});

module.exports = router;
