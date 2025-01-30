// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const utils = require('../utils');

// router.put('/update-status', async (req, res) => {
//     const { userId, status } = req.body;
//     try {
//         const queryText = `
//             UPDATE user 
//             SET status = ? 
//             WHERE user_id = ?`;
        
//         const result = await db.execute(queryText, [status, userId]);
//         console.log(result)
//         if (result.affectedRows === 0) {
//             res.send(utils.createError('User not found or status not changed'));
//         } else {
//             res.send(utils.createSuccess('User status updated successfully'));
//         }
//     } catch (err) {
//         console.log(err)
//         res.send(utils.createError(err));
//     }
// });

// module.exports = router;