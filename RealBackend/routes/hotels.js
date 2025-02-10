const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/hotels', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM hotels,city where hotels.city_id = city.city_id ';
        const [hotels] = await db.execute(queryText);
        res.send(utils.createSuccess(hotels));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

router.get('/hotel/:hotel_id', async (req, res) => {
    try {
        const hotelId = req.params.hotel_id;
        const queryText = 'SELECT * FROM hotels WHERE hotel_id=?';
        const [hotel] = await db.execute(queryText, [hotelId]);
        
            res.send(utils.createSuccess(hotel))
    } catch (err) {
        res.send(utils.createError(err));
    }   
    });

router.get('/hotels/city/:city_id', async (req, res) => {
    try {
        const cityId = req.params.city_id;
        const queryText = 'SELECT * FROM hotels,city WHERE hotels.city_id = ? and hotels.city_id=city.city_id';
        const [places] = await db.execute(queryText, [cityId]);
        if (places.length > 0) {
            res.send(utils.createSuccess(places));
        } else {
            res.status(404).send(utils.createError('No places found for the given city ID'));
        }
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