'use strict';

/**
 * @link https://gist.github.com/okoghenun/cea9edce75e716a0301de697b8ec794a
 *
 * Wraps the Express middlweares handlers to work with the Rill framework
 * It ensures all Express HTTP verbs work and also routes call their
 * middlewares with the interface (req, res, next) instead of (ctx, next)
 * which is native to Rill.
 * @param _app
 */
const routeTransformer = (_app) => {
    const HTTP_VERBS = [
        'checkout',
        'copy',
        'delete',
        'get',
        'head',
        'lock',
        'merge',
        'mkactivity',
        'mkcol',
        'move',
        'm-search',
        'notify',
        'options',
        'patch',
        'post',
        'purge',
        'put',
        'report',
        'search',
        'subscribe',
        'trace',
        'unlock',
        'unsubscribe',
        'all'
    ];

    const RILL_VERBS = [
        'get',
        'post',
        'at'
    ];

    HTTP_VERBS.map((v) => {
        let _v = `_${v}_`;

        // Cache away the original function of the method,
        // to be called later on.
        // If the method is not native to Rill, we assign it to Rill's app.at()
        if (RILL_VERBS.indexOf(v) > -1) {
            _app[_v] = _app[v];
        } else {
            _app[_v] = _app.at;
        }

        // Reassign the method to this transformed method
        // app.get(fn)
        // app.get(path, fn)
        // app.get(path, [middleware,] fn)
        _app[v] = (...args) => {

            let _args = ([...args]).reduce((acc, cur) => acc.concat(cur), []); //flatten array of args

            let handlers;

            let pathname = null;

            if (typeof _args[0] === 'string') {
                // If the first argument is a string, then this is the path for the route
                pathname = _args.shift();
            }

            handlers = _args;

            handlers.map((handler) => {
                let mArgs = [];
                if (pathname) {
                    mArgs.push(pathname);
                }

                // Create a handlers that uses Rill handler format.
                // This would be passed into Rill instead of the original Express handlers.
                // However it would call the original Express handlers with the appropriate arguments it supports
                let fxn = (ctx, next) => {

                    let nxt = (err) => {
                        if (err) {
                            console.error(err);
                        }

                        return next(...arguments);
                    };

                    return handler(ctx.req, ctx.res, nxt);
                };

                mArgs.push(fxn);

                // Call the cached method on each middleware (route handler)
                // with the modified arguments (req, res, next)
                try {
                    return _app[_v](...mArgs);
                } catch (e) {
                    console.error('Exception while calling handler for', pathname, e);
                }

            });
        };
    });

    return _app;
};

export default routeTransformer;
