const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/packages', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM packages';
        const [packages] = await db.execute(queryText);
        res.send(utils.createSuccess(packages));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

router.get('/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const queryText = 'SELECT city, description, total_cost, image FROM packages WHERE city = ?';
        const [result] = await db.execute(queryText, [city]);
        res.send(utils.createResult(result));
    } catch (error) {
        res.send(utils.createError(error));
    }
});

//do we really need this ?
// router.get('/sort/:order', async (req, res) => {
//     try {
//         const order = req.params.order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
//         const queryText = `SELECT city, description, total_cost, image FROM packages ORDER BY total_cost ${order}`;
//         const [result] = await db.execute(queryText, []);
//         res.send(utils.createResult(result));
//     } catch (error) {
//         res.send(utils.createError(error));
//     }
// });
router.get('/vehicles/details', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicle';
        const [result] = await db.execute(queryText, []);
        res.send(utils.createResult(result));
        console.log(result)
    } catch (error) {
        res.send(utils.createError(error));
    }
});


router.get('/vehicles', async (req, res) => {
    try {
        const queryText = 'SELECT type from vehicle ';
        const [result] = await db.execute(queryText,[]);
        console.log(result)
        res.send(utils.createResult(result));
    } catch (error) {
        res.send(utils.createError(error));
    }
});

module.exports = router;