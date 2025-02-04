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






router.get('/personal-details', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Extract the user ID from the token
    try {
      const queryText = `
        SELECT first_name, last_name, email, mobile_no, dob, aadhar_no,
               passport_no, marital_status 
        FROM personal_details 
        WHERE user_id = ?`;
      const [personalDetails] = await db.execute(queryText, [userId]);
      res.send(utils.createSuccess(personalDetails));
    } catch (err) {
      res.send(utils.createError(err.message));
    }
  });
  
module.exports = router;




