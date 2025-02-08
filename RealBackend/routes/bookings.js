const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');


//http://localhost:4000/bookings/user
// GET booking details by user ID from session storage
router.get('/bookings/user', async (req, res) => {
    const { user_id } = req.query;
  
    if (!user_id) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }
  
    try {
      const queryText = `
              SELECT
                  bd.booking_id,
                  bd.user_id,
                  bd.pkg_id,
                  bd.count_people,
                  bd.departure_date,
                  bd.return_date,
                  bd.total_amount,
                  bd.confirmed,
                  bd.booking_date,
                  u.first_name AS user_first_name,
                  u.last_name AS user_last_name,
                  p.description AS package_description,
                  p.total_cost AS package_cost,
                  c.city_name,
                  pl.name AS place_name,
                  pl.place_desc,
                  pl.image AS place_image,
                  v.name AS vehicle_name,
                  v.type AS vehicle_type,
                  h.name AS hotel_name,
                  h.cost AS hotel_cost,
                  h.image AS hotel_image
              FROM
                  booking_details bd
              JOIN
                  user u ON bd.user_id = u.user_id
              JOIN
                  packages p ON bd.pkg_id = p.pkg_id
              JOIN
                  city c ON p.city_id = c.city_id
              JOIN
                  place pl ON p.place_id = pl.place_id
              JOIN
                  vehicles v ON p.vehicle_id = v.vehicle_id
              JOIN
                  hotels h ON p.city_id = h.city_id
              WHERE
                  bd.user_id = ?;
          `;
      const [results] = await db.execute(queryText, [user_id]);
  
      res.json({ status: 'success', data: results });
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ status: 'error', error: 'An unknown error occurred' });
    }
  });
  