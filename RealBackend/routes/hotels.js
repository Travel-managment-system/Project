const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/hotels', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM hotels';
        const [hotels] = await db.execute(queryText);
        res.send(utils.createSuccess(hotels));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

// router.get('/hotels/byCity:city_id', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM hotels where city=?';
//         const [hotelsByCity] = await db.execute(queryText);
//         res.send(utils.createSuccess(hotelsByCity));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });


module.exports = router;