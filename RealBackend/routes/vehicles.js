const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/vehicles', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles';
        const [vehicles] = await db.execute(queryText);
        res.send(utils.createSuccess(vehicles));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

router.get('/vehicles/typeCar', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="car"';
        const [car] = await db.execute(queryText);
        res.send(utils.createSuccess(car));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/vehicles/typeBus', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="bus"';
        const [bus] = await db.execute(queryText);
        res.send(utils.createSuccess(bus));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/distance', async (req, res) => {
  const { source, destination } = req.query;
  const apiKey = '';

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&key=${apiKey}`);
    const distance = response.data.rows[0].elements[0].distance.value / 1000; // Distance in kilometers
    res.send({ distance });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch distance' });
  }
});


router.get('/vehicles/typeAirplane', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="airplane"';
        const [airplane] = await db.execute(queryText);
        res.send(utils.createSuccess(airplane));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/vehicles/typeTrain', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="Train"';
        const [train] = await db.execute(queryText);
        res.send(utils.createSuccess(train));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// /add vehicles
router.post('/manager/vehicles', async (req, res) => {
    const { unique_no, type, name, cost } = req.body;
  
    if (!unique_no || !type || !name || !cost) {
      return res.status(400).json({ status: 'error', message: 'Unique No, Type, Name, and Cost are required' });
    }
  
    try {
      const queryText = 'INSERT INTO vehicles (unique_no, type, name, cost) VALUES (?, ?, ?, ?)';
      const [result] = await db.execute(queryText, [unique_no, type, name, cost]);
  
      const newVehicle = {
        vehicle_id: result.insertId,
        unique_no,
        type,
        name,
        cost
      };
  
      res.json({ status: 'success', data: newVehicle });
    } catch (err) {
      console.error('Error adding vehicle:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
    });
//edit vehicle details 
    router.put('/manager/vehicles/:vehicle_id', async (req, res) => {
        const { vehicle_id } = req.params;
        const { unique_no, type, name, cost } = req.body;
      
        if (!unique_no || !type || !name || !cost) {
          return res.status(400).json({ status: 'error', message: 'Unique No, Type, Name, and Cost are required' });
        }
      
        try {
          const queryText = 'UPDATE vehicles SET unique_no = ?, type = ?, name = ?, cost = ? WHERE vehicle_id = ?';
          const [result] = await db.execute(queryText, [unique_no, type, name, cost, vehicle_id]);
      
          if (result.affectedRows > 0) {
            const updatedVehicle = {
              vehicle_id,
              unique_no,
              type,
              name,
              cost
            };
            res.json({ status: 'success', data: updatedVehicle });
          } else {
            res.status(404).json({ status: 'error', message: 'Vehicle not found' });
          }
        } catch (err) {
          console.error('Error updating vehicle:', err);
          res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
        }
      });

module.exports = router;

