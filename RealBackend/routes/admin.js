const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config')



// //register
// router.post('/register', async (req, res) => {
//     const {firstName,lastName, gmail, password} = req.body;
//     try{
//         const encryptedPassword = String(cryptoJs.SHA256(password))
//         const queryText = `
//                 INSERT INTO user 
//                     (first_name, last_name, gmail, password,role) 
//                         VALUES 
//                          (?,?,?,?,'admin')`;
        
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
//                 gmail = ? AND password = ? and status='active' and role='admin'`;
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


// See all users
router.get('/users', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM user';
        const [users] = await db.query(queryText);
        res.send(utils.createSuccess(users));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// router.get('/users/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const queryText = 'SELECT * FROM user where user_id=?';
//         const [users] = await db.query(queryText,[userId]);
//         res.send(utils.createSuccess(users));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });

// Delete a user
// Delete a user
router.delete('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
  
    try {
      // First, delete the related personal details
      const deletePersonalDetailsQuery = 'DELETE FROM personal_details WHERE user_id = ?';
      const [personalDetailsResult] = await db.execute(deletePersonalDetailsQuery, [user_id]);
  
      // Then, delete the user
      const deleteUserQuery = 'DELETE FROM user WHERE user_id = ?';
      const [userResult] = await db.execute(deleteUserQuery, [user_id]);
  
      if (userResult.affectedRows > 0) {
        res.json({ status: 'success', message: 'User and related details deleted successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
  

  
  // Edit a user
router.put('/users/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { first_name,last_name, email } = req.body;
  
    try {
      const query = 'UPDATE user SET first_name = ?,last_name = ?, email = ? WHERE id = ?';
      const [result] = await db.execute(query, [first_name,last_name, email, user_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'User updated successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
      }
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
  

// // See all packages
// router.get('/packages', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM packages';
//         const [packages] = await db.execute(queryText);
//         res.send(utils.createSuccess(packages));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });

// Update the status of user
// Update user status
router.put('/user/status', async (req, res) => {
    const { user_id, status } = req.body;
  console.log(user_id,status)
    if (!user_id || !status) {
      return res.status(400).json({ status: 'error', message: 'Invalid request: userId and status are required' });
    }
  
    try {
      const queryText = 'UPDATE user SET status = ? WHERE user_id = ?';
      const [result] = await db.execute(queryText, [status, user_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'User status updated successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });
  

// Update the status of packages details
router.patch('/package/status', async (req, res) => {
    const { packageId, status } = req.body;
    try {
        const queryText = 'UPDATE packages SET status = ? WHERE package_id = ?';
        const result = await db.execute(queryText, [status, packageId]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// See all packages using join hotels and vehicles
router.get('/packages/details', async (req, res) => {
    try {
        const queryText = `
            SELECT p.*, h.hotel_name, v.vehicle_name 
            FROM packages p
            JOIN hotels h ON p.hotel_id = h.hotel_id
            JOIN vehicles v ON p.vehicle_id = v.vehicle_id`;
        const [packages] = await db.execute(queryText);
        res.send(utils.createSuccess(packages));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// See all booking history
router.get('/bookings/history', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM travel_history';
        const [bookings] = await db.execute(queryText);
        res.send(utils.createSuccess(bookings));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// See all booking details
router.get('/bookings/details', async (req, res) => {
    try {
        const queryText = `
            SELECT booking_details.booking_id,user.user_id,hotels.name,place.name,city.city_name,departure_date,return_date,total_amount from booking_details,user,hotels,city,place,vehicles where booking_details.user_id=user.user_id 
            and
            booking_details.hotel_id=hotels.hotel_id
            and
            booking_details.city_id=city.city_id
            and
            booking_details.place_id=place.place_id
            and
            booking_details.vehicle_id=vehicles.vehicle_id
            `;
        const [bookings] = await db.execute(queryText);
        res.send(utils.createSuccess(bookings));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


// Delete a booking
router.delete('/bookings/:booking_id', async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      const query = 'DELETE FROM booking_details WHERE booking_id = ?';
      const [result] = await db.execute(query, [booking_id]);
  
      if (result.affectedRows > 0) {
        res.json({ status: 'success', message: 'Booking deleted successfully' });
      } else {
        res.status(404).json({ status: 'error', message: 'Booking not found' });
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ status: 'error', message: 'An unknown error occurred' });
    }
  });


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


  
  
module.exports = router;




