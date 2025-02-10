const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/places', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM place,city where place.city_id=city.city_id';
        const [packages] = await db.execute(queryText);
        res.send(utils.createSuccess(packages));
    } catch (err) {
        res.send(utils.createError(err));
    }


});router.get('/cities', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM city';
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
        const queryText = 'SELECT * FROM place,city WHERE place_id = ? and place.city_id=city.city_id';
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
                  c.city_id,
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
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }
    try {
      const queryText = `
         SELECT 
    bd.*,
    h.*,
    c.*,
    
    pl.*
FROM 
    booking_details bd
JOIN 
    hotels h ON bd.hotel_id = h.hotel_id
JOIN 
    city c ON bd.city_id = c.city_id
JOIN 
    place pl ON bd.place_id = pl.place_id

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


  //booking 
  router.post('/bookings', (req, res) => {
    const {
      user_id, hotel_id, vehicle_id, place_id, city_id,
      departure_date, return_date, booking_date, people_count, total_amount
    } = req.body;
  
    const query = `
      INSERT INTO booking_details (
        user_id, hotel_id, vehicle_id, place_id, city_id,
        departure_date, return_date, booking_date, count_people, total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [
      user_id, hotel_id, vehicle_id, place_id, city_id,
      departure_date, return_date, booking_date, people_count, total_amount
    ], (err, result) => {
      if (err) {
        console.error('Error adding booking:', err);
        res.status(500).json({ status: 'error', message: 'Error adding booking' });
        return;
      }
      else{
        console.log("kuchto hua")
      }
    //   console.log('Booking added successfully:', result);
      res.json({ status: 'success', message: 'Booking added successfully' });
    });
  
    // console.log('Booking endpoint hit'); // Debugging statement
  });
  
  //post to add booking /cart

//   // POST create a new booking
//   router.post('/book-package', async (req, res) => {
//     const { user_id, pkg_id, count_people, departure_date, return_date, booking_date } = req.body;

//     try {
//       const queryPackage = `
//             SELECT
//                 p.description AS package_description,
//                 p.total_cost AS package_cost,
//                 c.city_name,
//                 c.city_desc,
//                 pl.name AS place_name,
//                 pl.place_desc,
//                 pl.image AS place_image,
//                 v.name AS vehicle_name,
//                 v.type AS vehicle_type,
//                 v.cost AS vehicle_cost
//             FROM
//                 packages p
//             JOIN
//                 city c ON p.city_id = c.city_id
//             JOIN
//                 place pl ON p.place_id = pl.place_id
//             JOIN
//                 vehicles v ON p.vehicle_id = v.vehicle_id
//             WHERE
//                 p.pkg_id = ?;
//         `;
//       const [packageDetails] = await db.execute(queryPackage, [pkg_id]);

//       // Check if package details were retrieved
//       if (!packageDetails.length) {
//         console.error('Error: Package not found');
//         return res.status(404).json({ status: 'error', error: 'Package not found' });
//       }

//       const packageDetail = packageDetails[0];
//       console.log('Package Details:', packageDetail);

//       // Parse costs as numbers and validate
//       const packageCost = parseFloat(packageDetail.package_cost);
//       const vehicleCost = parseFloat(packageDetail.vehicle_cost);

//       if (isNaN(packageCost) || isNaN(vehicleCost)) {
//         console.error('Error: Invalid package or vehicle cost');
//         return res.status(500).json({ status: 'error', error: 'Invalid package or vehicle cost' });
//       }


//       const total_amount = packageCost + vehicleCost;
//       console.log('Calculated Total Amount:', total_amount);


//       console.log('Booking Details:', {
//         user_id,
//         pkg_id,
//         count_people,
//         departure_date,
//         return_date,
//         total_amount,
//         booking_date
//       });

//       // Insert booking details
//       const queryBooking = `
//             INSERT INTO booking_details (user_id, pkg_id, count_people, departure_date, return_date, total_amount, confirmed, booking_date)
//             VALUES (?, ?, ?, ?, ?, ?, 'yes', ?);
//         `;
//       await db.execute(queryBooking, [user_id, pkg_id, count_people, departure_date, return_date, total_amount, booking_date]);

//       res.send({ status: 'success', message: 'Package booked successfully' });
//     } catch (err) {
//       console.error('Server Error:', err);
//       res.status(500).json({ status: 'error', error: 'An unknown error occurred' });
//     }
//   });

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