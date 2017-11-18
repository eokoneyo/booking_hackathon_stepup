'use strict';

module.exports = () => {

    let router = require('express').Router();

    router.get('/', (req, res, next) => {
        //do Something here
        res.json({status: 'success', message: 'Hello World'});
    });


    return router;

};