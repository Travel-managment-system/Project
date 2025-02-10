const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');
// const cryptoJs = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const config = require('../config')

router.post('/cities', async (req, res) => {
    const { city_name, city_desc } = req.body;
  
    if (!city_name || !city_desc) {
      return res.status(400).json({ status: 'error', message: 'City name and description are required' });
    }
  
    try {
      const queryText = 'INSERT INTO city (city_name, city_desc) VALUES (?, ?)';
      const [result] = await db.execute(queryText, [city_name, city_desc]);
  
      const newCity = {
        city_id: result.insertId,
        city_name,
        city_desc
      };
  
      res.json({ status: 'success', data: newCity });
    } catch (err) {
      console.error('Error adding city:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });

  router.delete('/cities/:city_id', async (req, res) => {
    const { city_id } = req.params;
  
    try {
      const queryText = 'DELETE FROM city WHERE city_id = ?';
      const [result] = await db.execute(queryText, [city_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'City deleted successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'City not found' });
      }
    } catch (err) {
      console.error('Error deleting city:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/'); // Uploads directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  const upload = multer({ storage });
  
  // Add a new place
  router.post('/places', upload.single('image'), async (req, res) => {
    const { place_name, place_desc, city_id } = req.body;
    const image = req.file ? req.file.filename : null;
  
    if (!place_name || !place_desc || !city_id) {
      return res.status(400).json({ status: 'error', message: 'Place name, description, and city ID are required' });
    }
  
    try {
      const queryText = 'INSERT INTO place (name, place_desc, city_id, image) VALUES (?, ?, ?, ?)';
      const [result] = await db.execute(queryText, [place_name, place_desc, city_id, image]);
  
      const newPlace = {
        place_id: result.insertId,
        place_name,
        place_desc,
        city_id,
        image
      };
  
      res.json({ status: 'success', data: newPlace });
    } catch (err) {
      console.error('Error adding place:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
  
  // Delete a place
  router.delete('/places/:place_id', async (req, res) => {
    const { place_id } = req.params;
  
    try {
      const queryText = 'DELETE FROM place WHERE place_id = ?';
      const [result] = await db.execute(queryText, [place_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'Place deleted successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'Place not found' });
      }
    } catch (err) {
      console.error('Error deleting place:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });

// //register
// router.post('/register', async (req, res) => {
//     const {firstName,lastName, gmail, password} = req.body;
//     try{
//         const encryptedPassword = String(cryptoJs.SHA256(password))
//         const queryText = `
//                 INSERT INTO user 
//                     (first_name, last_name, gmail, password,role) 
//                         VALUES 
//                          (?,?,?,?,'manager')`;
        
//         const result = await db.query(queryText, [firstName, lastName, gmail, encryptedPassword]);
//         res.send(utils.createSuccess(result));
//     }
//     catch(err){
//         res.send(utils.createError(err));
//     }
//     })
//     // ..patch
//     //put multiple 

// router.post('/login', async(req, res) => {
// const {gmail, password} = req.body;
// try{
//     const encryptedPassword = String(cryptoJs.SHA256(password))
//     const queryText = `
//             SELECT user_id,first_name,last_name FROM user 
//                 WHERE   
//                 gmail = ? AND password = ? and status='active' and role='manager'`;
//     const [users] = await db.query(queryText, [gmail, encryptedPassword]);
//   if(users.length == 0){
// res.send(utils.createError('user dose not exist'));
//   }
//   else{
//       const user = users[0];
//       const token = jwt.sign({
//         userId: user['user_id'],
//         firstName: user['first_name']
//           },config.secret )
//           res.send(
//             utils.createSuccess({
//                 token,firstName: user['first_name'],
//                 lastName: user['last_name'],
//             })
//         );
//         }
//     }
// catch(err){
//     res.send(utils.createError(err));
// }
// })

// See all packages
// router.get('/packages', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM packages';
//         const [packages] = await db.execute(queryText);
//         res.send(utils.createSuccess(packages));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });

// Create package
router.post('/create-packages', async (req, res) => {
    const { city, description,image } = req.body;
    try {
        const queryText = 'INSERT INTO packages (city, description,image) VALUES (?,?,?)';
        const result = await db.execute(queryText, [city, description,image]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// See all vehicles
// router.get('/vehicles', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM vehicle';
//         const [vehicles] = await db.execute(queryText);
//         res.send(utils.createSuccess(vehicles));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });

// Create vehicle
router.post('/vehicles', async (req, res) => {
    const { name, type, capacity } = req.body;
    try {
        const queryText = 'INSERT INTO vehicle (name, type, capacity) VALUES (?, ?, ?)';
        const result = await db.execute(queryText, [name, type, capacity]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// // See all hotels
// router.get('/hotels', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM hotels';
//         const [hotels] = await db.execute(queryText);
//         res.send(utils.createSuccess(hotels));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });

// Create hotel


// Update package


// Update hotel
router.put('/hotels/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, rating } = req.body;
    try {
        const queryText = 'UPDATE hotels SET name = ?, location = ?, rating = ? WHERE id = ?';
        const result = await db.execute(queryText, [name, location, rating, id]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// Update vehicle
router.put('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type, capacity } = req.body;
    try {
        const queryText = 'UPDATE vehicles SET name = ?, type = ?, capacity = ? WHERE id = ?';
        const result = await db.execute(queryText, [name, type, capacity, id]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Uploads directory
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });
//   const upload = multer({ storage });
  
  // Add a new hotel// Add a new hotel
router.post('/hotels', upload.single('image'), async (req, res) => {
    const { hotel_name, hotel_desc, city_id, cost } = req.body;
    const image = req.file ? req.file.filename : null;
  
    if (!hotel_name || !hotel_desc || !city_id || !cost) {
      return res.status(400).json({ status: 'error', message: 'Hotel name, description, city ID, and cost are required' });
    }
  
    try {
      // Check if city_id exists
      const cityCheckQuery = 'SELECT * FROM city WHERE city_id = ?';
      const [cityCheckResult] = await db.execute(cityCheckQuery, [city_id]);
      if (cityCheckResult.length === 0) {
        return res.status(404).json({ status: 'error', message: 'City not found' });
      }
  
      const queryText = 'INSERT INTO hotels (name, reviews, city_id, cost, image) VALUES (?, ?, ?, ?, ?)';
      const [result] = await db.execute(queryText, [hotel_name, hotel_desc, city_id, cost, image]);
  
      const newHotel = {
        hotel_id: result.insertId,
        hotel_name,
        hotel_desc,
        city_id,
        cost,
        image
      };
  
      res.json({ status: 'success', data: newHotel });
    } catch (err) {
      console.error('Error adding hotel:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
  
  
  // Delete a hotel
  router.delete('/hotels/:hotel_id', async (req, res) => {
    const { hotel_id } = req.params;
  
    try {
      const queryText = 'DELETE FROM hotels WHERE hotel_id = ?';
      const [result] = await db.execute(queryText, [hotel_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'Hotel deleted successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'Hotel not found' });
      }
    } catch (err) {
      console.error('Error deleting hotel:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
module.exports = router;




