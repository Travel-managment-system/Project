const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/places', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM place';
        const [packages] = await db.execute(queryText);
        res.send(utils.createSuccess(packages));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


///get place by id
router.get('/places/:place_id', async (req, res) => {
    try {
        const placeId = req.params.place_id;
        const queryText = 'SELECT * FROM place WHERE place_id = ?';
        const [place] = await db.execute(queryText, [placeId]);
        if (place.length > 0) {
            res.send(utils.createSuccess(place[0]));
        } else {
            res.status(404).send(utils.createError('Place not found'));
        }
    } catch (err) {
        res.send(utils.createError(err));
    }
});






router.get('/places', async (req, res) => {
    try {
        const cityId = req.query.cityId;
        const queryText = 'SELECT * FROM place WHERE city_id = ?';
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


    router.get('/places/city/:city_id', async (req, res) => {
        try {
            const cityId = req.params.city_id;
            const queryText = 'SELECT * FROM place,city WHERE place.city_id = ? and place.city_id=city.city_id';
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

        
// GET places by specific city

//http://localhost:4000/places-by-city?city_name=Agra
router.get('/places-by-city', async (req, res) => {
    const { city_name } = req.query;
  
    try {
      const queryText = `
              SELECT
                  pl.place_id,
                  pl.name AS place_name,
                  pl.place_desc,
                  pl.image AS place_image,
                  c.city_name
              FROM
                  place pl
              JOIN
                  city c ON pl.city_id = c.city_id
              WHERE
                  c.city_name = ?
              ORDER BY
                  pl.name;
          `;
      const [results] = await db.execute(queryText, [city_name]);
      res.send(results);
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  });
  
  
  
router.get('/bookings/user', async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }
  
    try {
      const queryText = `
         SELECT 
    bd.*,
    h.*,
    c.*,
    pl.*,
    v.*
FROM 
    booking_details bd
JOIN 
    hotels h ON bd.hotel_id = h.hotel_id
JOIN 
    city c ON bd.city_id = c.city_id
JOIN 
    place pl ON bd.place_id = pl.place_id
JOIN 
    vehicles v ON bd.vehicle_id = v.vehicle_id
WHERE 
    bd.user_id = ?;
  `;
      const [results] = await db.execute(queryText, [user_id]);
  
      res.json({ status: 'success', data: results });
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).json({ status: 'error', error: 'An unknown error occurred' });
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