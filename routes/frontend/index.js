'use strict';

module.exports = (router, renderer) => {

    router.get('/', (req, res, next) => {
        //do Something here
        renderer.render(res, 'templates/index');
    });

    router.get('/start', (req, res, next) => {

        renderer.render(res, 'templates/start');
    });

    return router;
};