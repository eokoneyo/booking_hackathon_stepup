'use strict';

module.exports = (router, renderer) => {

    router.get('/', (req, res, next) => {
        //do Something here
        renderer.render(res, 'templates/index');
    });

    router.get('/start', (req, res, next) => {

        renderer.render(res, 'templates/start');
    });


    router.get('/course/1', (req, res, next) => {

        renderer.render(res, 'templates/course');
    });

    return router;
};