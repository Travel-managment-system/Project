const express = require('express');
const router = express.Router();
const db = require('../db'); // Replace with your actual database connection module
const utils = require('../utils'); // Replace with your actual utilities module

// Endpoint to fetch wishlist
router.get('/wishlist', async (req, res) => {
  try {
    const userId = req.query.user_id; // Retrieve user id from query parameters
    if (!userId) {
      return res.status(400).send(utils.createError('User ID is required'));
    }
    const queryText = 'SELECT * FROM wishlist JOIN place ON wishlist.place_id = place.place_id WHERE user_id = ?';
    const [wishlist] = await db.execute(queryText, [userId]);
    res.send(utils.createSuccess(wishlist));
  } catch (err) {
    res.send(utils.createError(err));
  }
});

// Endpoint to add to wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { user_id, place_id } = req.body;
    if (!user_id || !place_id) {
      return res.status(400).send(utils.createError('User ID and Place ID are required'));
    }
    const queryText = 'INSERT INTO wishlist (user_id, place_id) VALUES (?, ?)';
    await db.execute(queryText, [user_id, place_id]);
    res.send(utils.createSuccess('Place added to wishlist'));
  } catch (err) {
    res.send(utils.createError(err));
  }
});

// Endpoint to remove from wishlist
router.delete('/wishlist/:place_id', async (req, res) => {
  try {
    const userId = req.query.user_id; // Retrieve user id from query parameters
    const placeId = req.params.place_id;
    if (!userId || !placeId) {
      return res.status(400).send(utils.createError('User ID and Place ID are required'));
    }
    const queryText = 'DELETE FROM wishlist WHERE user_id = ? AND place_id = ?';
    await db.execute(queryText, [userId, placeId]);
    res.send(utils.createSuccess('Place removed from wishlist'));
  } catch (err) {
    res.send(utils.createError(err));
  }
});

module.exports = router;
