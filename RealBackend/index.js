// const mysql= require('mysql2' );
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./db');
const utils = require('./utils');

//create new react app

const app = express();

app.use(cors());
app.use(morgan('combined'));//login purpose and to see all the details
//GIVEN BY MORGAN
/*
127.0.0.1 - - [27/Dec/2024:17:32:26 +0000] 
"POST /user/register HTTP/1.1" 200 142 "-" "PostmanRuntime/7.43.0"*/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('images'));
//configure the prtected routes
app.use((request, response, next) => {
    const skipUrls = [
                       '/login', 
                         '/register',
                              '/places','/vehicles','/hotels','/vehicles/typeAirplane'
                                    ];
// if (request.url === '/user/login' || request.url === '/user/register') {
if(skipUrls.findIndex(item=>item==request.url)!=-1 ) { // 
next();
}
else{
    const token = request.headers['token'];
    if(!token){
       response.send(utils.createError('Token is missing'));
    }
    else{
     try {
        const payload = jwt.verify(token, config.secret);
        request.data = payload;
        next();
     } catch (error) {
        response.send(utils.createError('Invalid token'));
     }}

}   
 });

//add the routes
const userRouter = require('./routes/users');
app.use('/',  userRouter);

const wishlistRouter = require('./routes/wishlist');
app.use('/',  wishlistRouter);
 
const packageRouter = require('./routes/package');
app.use('/', packageRouter);

// const bookingRouter = require('./routes/bookings');
// app.use('/', bookingRouter);

const vehicleRouter = require('./routes/vehicles');
app.use('/', vehicleRouter);
// const updateUserRouter = require('./routes/updateUser');
// app.use('/updateUser', updateUserRouter);
const hotelRouter = require('./routes/hotels');
app.use('/', hotelRouter);


const managerRouter = require('./routes/managers');
app.use('/manager', managerRouter);

// //flights
// const flightRouter = require('./routes/calculateDistance');
// app.use('/', flightRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.listen(4000,'0.0.0.0', () => {    
    console.log('Server is running on port 4000');
});