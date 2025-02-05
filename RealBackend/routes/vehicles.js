const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// // See all packages
router.get('/vehicles', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles';
        const [vehicles] = await db.execute(queryText);
        res.send(utils.createSuccess(vehicles));
    } catch (err) {
        res.send(utils.createError(err));
    }
});

router.get('/vehicles/typeCar', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="car"';
        const [car] = await db.execute(queryText);
        res.send(utils.createSuccess(car));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/vehicles/typeBus', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="bus"';
        const [bus] = await db.execute(queryText);
        res.send(utils.createSuccess(bus));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/vehicles/typeAirplane', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="airplane"';
        const [airplane] = await db.execute(queryText);
        res.send(utils.createSuccess(airplane));
    } catch (err) {
        res.send(utils.createError(err));
    }
});


router.get('/vehicles/typeTrain', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM vehicles where type="Train"';
        const [train] = await db.execute(queryText);
        res.send(utils.createSuccess(train));
    } catch (err) {
        res.send(utils.createError(err));
    }
});
module.exports = router;