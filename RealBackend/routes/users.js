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
<<<<<<< Updated upstream
                userId: user['user_id']
=======
                email: user['email'],
                user_id: user['user_id'],
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
router.put('/UpdateProfile', async (req, res) => {
  const { user_id, phone, dob, marital_status, first_name, last_name } = req.body;
  try {
    const queryText = `
      UPDATE personal_details AS pd
      JOIN user AS u ON pd.user_id = u.user_id
      SET pd.mobile_no = ?, pd.dob = ?, pd.marital_status = ?, u.first_name = ?, u.last_name = ?
      WHERE pd.user_id = ?`;
    const result = await db.query(queryText, [phone, dob, marital_status, first_name, last_name, user_id]);
    res.send(utils.createSuccess(result));
  } catch (err) {
    res.send(utils.createError(err));
  }
=======
router.put('/UpdateProfile',async(req,res)=>{
    const {user_id,phone,dob,aadhar_no,passport_no,marital_status} = req.body;
try {
    const queryText = `UPDATE user SET phone = ?, dob = ?, aadhar_no =?,
    passport_no = ?, marital_status = ? WHERE user_id = ?` ;
    const result = await db.query(queryText,[phone,dob,aadhar_no,passport_no,marital_status])
    res.send(utils.createSuccess(result))
    }catch(err){
        res.send(utils.createError(err))
        
}
})

router.get('/personal-details/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const queryText = `
            SELECT first_name, last_name, email, password,mobile_no, dob, gender, aadhar_no,
    passport_no, marital_status from personal_details,user 
            WHERE user.user_id=personal_details.user_id and personal_details.user_id = ?`;
        
        const [personalDetails] = await db.execute(queryText, [userId]);
        res.send(utils.createSuccess(personalDetails));
    } catch (err) {
        res.send(utils.createError(err));
    }
>>>>>>> Stashed changes
});






router.get('/profile', async (req, res) => {
    
    try {
        const userId = req.query.user_id; // Extract the user ID from the token
        if (!userId) {
            return res.status(400).send(utils.createError('User ID is required'));
          }
      const queryText = `
        SELECT first_name, last_name, email, mobile_no, dob, aadhar_no,
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




