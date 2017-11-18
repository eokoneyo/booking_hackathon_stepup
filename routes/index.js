'use strict';

module.exports = (app) => {

    const api = require('routes/api')();
    const frontendRoutes = require('routes/frontend')();

    app.use('/api', api);
    app.use('/', frontendRoutes)

};