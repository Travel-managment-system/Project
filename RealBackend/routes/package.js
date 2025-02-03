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

// router.get('/:city', async (req, res) => {
//     try {
//         const city = req.params.city;
//         const queryText = 'SELECT city, description, total_cost, image FROM packages WHERE city = ?';
//         const [result] = await db.execute(queryText, [city]);
//         res.send(utils.createResult(result));
//     } catch (error) {
//         res.send(utils.createError(error));
//     }
// });

// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const utils = require('../utils');

// // See all packages with pagination
// router.get('/packages', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//         const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
//         const startIndex = (page - 1) * limit;

//         const queryText = 'SELECT * FROM packages LIMIT ?, ?';
//         const [packages] = await db.execute(queryText, [startIndex, limit]);

//         // Get the total count of packages
//         const countQuery = 'SELECT COUNT(*) as count FROM packages';
//         const [countResult] = await db.execute(countQuery);
//         const totalCount = countResult[0].count;
//         const totalPages = Math.ceil(totalCount / limit);

//         res.send(utils.createSuccess({
//             data: packages,
//             currentPage: page,
//             totalPages: totalPages
//         }));
//     } catch (err) {
//         res.send(utils.createError(err));
//     }
// });




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
// router.get('/vehicles/details', async (req, res) => {
//     try {
//         const queryText = 'SELECT * FROM vehicle';
//         const [result] = await db.execute(queryText, []);
//         res.send(utils.createResult(result));
//         console.log(result)
//     } catch (error) {
//         res.send(utils.createError(error));
//     }
// });


// router.get('/vehicles', async (req, res) => {
//     try {
//         const queryText = 'SELECT type from vehicle ';
//         const [result] = await db.execute(queryText,[]);
//         console.log(result)
//         res.send(utils.createResult(result));
//     } catch (error) {
//         res.send(utils.createError(error));
//     }
// });

module.exports = router;