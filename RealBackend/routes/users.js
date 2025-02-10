const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config')
const authenticateToken = require('../authenticateToken');



//register
router.post('/register', async (req, res) => {
    
    const {firstName,lastName, email, password} = req.body;
    console.log(firstName,lastName, email, password)
    try{
        const encryptedPassword = String(cryptoJs.SHA256(password))
        const queryText = `
                INSERT INTO user 
                    (first_name, last_name, email, password) 
                        VALUES 
                         (?,?,?,?)`;
        
        const result = await db.query(queryText, [firstName, lastName, email, encryptedPassword]);
        res.send(utils.createSuccess(result));
    }
    catch(err){
        res.send(utils.createError(err));
    }
    })
    

//     router.get('/profile:id', async(req, res) => {
// const {userId} = req.params;
// try{
//     const queryText = `SELECT first_name, last_name, email, role FROM user WHERE user_id = ?`;

//     })
router.post('/login', async(req, res) => {
const {email, password} = req.body;
try{
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const queryText = `
            SELECT user_id,first_name,last_name,role FROM user 
                WHERE   
                email = ? AND password = ? and status='active'`;
    const [users] = await db.query(queryText, [email, encryptedPassword]);
  if(users.length == 0){
res.send(utils.createError('user dose not exist'));
  }
  else{
      const user = users[0];
      const token = jwt.sign({
        userId: user['user_id'],
        firstName: user['first_name']
          },config.secret )
          res.send(
            utils.createSuccess({
                token,firstName: user['first_name'],
                lastName: user['last_name'],
                role: user['role'],
                userId: user['user_id']
            })
        );
        }
    }
catch(err){
    res.send(utils.createError(err));
}
})

// Update user status
//update user information 
router.put('/UpdateProfile', async (req, res) => {
  const {
    user_id, phone, marital_status, first_name, last_name,
    email, gender, aadhar_no, passport_no
  } = req.body;

  try {
    const queryText = `
      UPDATE personal_details AS pd
      JOIN user AS u ON pd.user_id = u.user_id
      SET pd.mobile_no = ?,  pd.marital_status = ?, 
          pd.gender = ?, pd.aadhar_no = ?, pd.passport_no = ?, 
          u.first_name = ?, u.last_name = ?, u.email = ?
      WHERE pd.user_id = ?`;
    const result = await db.query(queryText, [
      phone, marital_status, gender, aadhar_no, passport_no,
      first_name, last_name, email, user_id
    ]);
    res.send(utils.createSuccess(result));
  } catch (err) {
    res.send(utils.createError(err));
  }
});


router.post('/AddPersonalDetails', (req, res) => {
  let {
    user_id, mobile_no, dob, gender, marital_status, aadhar_no, passport_no
  } = req.body;

  const query = `
    INSERT INTO personal_details (user_id, mobile_no, dob, gender, marital_status, aadhar_no, passport_no)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      mobile_no = VALUES(mobile_no),
      dob = VALUES(dob),
      gender = VALUES(gender),
      marital_status = VALUES(marital_status),
      aadhar_no = VALUES(aadhar_no),
      passport_no = VALUES(passport_no)
  `;

  db.query(query, [user_id, mobile_no, dob, gender, marital_status, aadhar_no, passport_no
  ], (err, result) => {
    if (err) {
      console.error('Error adding profile details:', err);
      res.status(500).json({ status: 'error', message: 'Error adding profile details' });
      return;
    }
    
    res.json({ status: 'success', message: 'Profile details added/updated successfully' });
  });
});




router.get('/profile', async (req, res) => {
    
    try {
        const userId = req.query.user_id; // Extract the user ID from the token
        if (!userId) {
            return res.status(400).send(utils.createError('User ID is required'));
          }
      const queryText = `
        SELECT first_name, last_name, email,gender, mobile_no, dob, aadhar_no,
               passport_no, marital_status 
        FROM personal_details,user 
        WHERE personal_details.user_id = ? and personal_details.user_id=user.user_id`;
      const [personalDetails] = await db.execute(queryText, [userId]);
      res.send(utils.createSuccess(personalDetails));
    } catch (err) {
      res.send(utils.createError(err.message));
    }
  });


  router.patch('/update-status', async (req, res) => {
    const  {user_id } = req.body;
    try {
      console.log(user_id)
      const queryText = `
        UPDATE user 
        SET status='deactive'
        WHERE user_id = ?`;
      const result = await db.query(queryText, [user_id]);
      console.log("hello",result)
      res.send(utils.createSuccess(result));
      // console.log("object changed",result)
    } catch (err) {
      res.send(utils.createError(err));
    }
  });
module.exports = router;




