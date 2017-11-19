'use strict';
const booking = require('/controllers/booking.controller')

module.exports = () => {

    let router = require('express').Router();

    router.get('/', (req, res, next) => {
        //do Something here
        res.json({status: 'success', message: 'Hello World'});
    });

    router.get('/getHotels', (req, res, next) => {
        booking()
    });


    return router;

};