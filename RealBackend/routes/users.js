const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config')



//register
router.post('/register', async (req, res) => {
    const {firstName,lastName, gmail, password} = req.body;
    try{
        const encryptedPassword = String(cryptoJs.SHA256(password))
        const queryText = `
                INSERT INTO user 
                    (first_name, last_name, gmail, password) 
                        VALUES 
                         (?,?,?,?)`;
        
        const result = await db.query(queryText, [firstName, lastName, gmail, encryptedPassword]);
        res.send(utils.createSuccess(result));
    }
    catch(err){
        res.send(utils.createError(err));
    }
    })
    

router.post('/login', async(req, res) => {
const {gmail, password} = req.body;
try{
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const queryText = `
            SELECT user_id,first_name,last_name,role FROM user 
                WHERE   
                gmail = ? AND password = ? and status='active'`;
    
//     // const users = await db.query(queryText, [gmail, encryptedPassword]);
//     const users = await db.query(queryText, [gmail, encryptedPassword]);
//             res.send(
//               utils.createSuccess({
//                   users})
//           );
//           }
      
//   catch(err){
//       res.send(utils.createError(err));
//   }
    //above is not a way to use this instead use this [users]

    const [users] = await db.query(queryText, [gmail, encryptedPassword]);
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
            })
        );
        }
    }
catch(err){
    res.send(utils.createError(err));
}
})

// Update user status


module.exports = router;




