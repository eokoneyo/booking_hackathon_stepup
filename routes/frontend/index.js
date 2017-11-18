'use strict';

module.exports = () => {

    let router = require('express').Router();

    router.get('/', (req, res, next) => {
        //do Something here
        res.render('templates/index');
    });



    return router;

};