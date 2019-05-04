'use strict';

const Renderer = require('libs/renderer');

module.exports = (app) => {

    const api = require('routes/api')();

    //we passing the router we'd like to use for the frontend routes here because we intend to use
    //the one rilljs provides on the client
    const frontendRoutes = require('routes/frontend')(require('express').Router(), new Renderer());

    app.use('/api', api);
    app.use('/', frontendRoutes)
};
