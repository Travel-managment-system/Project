const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
// const cryptoJs = require('crypto-js');
// const jwt = require('jsonwebtoken');
// const config = require('../config')



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
router.post('/hotels', async (req, res) => {
    const { name, location, rating } = req.body;
    try {
        const queryText = 'INSERT INTO hotels (name, location, rating) VALUES (?, ?, ?)';
        const result = await db.execute(queryText, [name, location, rating]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// Update package
router.put('/packages/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const queryText = 'UPDATE packages SET name = ?, description = ?, price = ? WHERE id = ?';
        const result = await db.execute(queryText, [name, description, price, id]);
        res.send(utils.createSuccess(result));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

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
module.exports = router;




