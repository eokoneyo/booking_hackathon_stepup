'use strict';

/**
 * Utility for rendering
 */

class Renderer {

    constructor(dust) {

        //teach client how to render templates
        if (!__SERVER__) {
            window.dust =  dust;

            dust.onLoad = (tpl, cb) => {
                Promise.resolve().then(() => {

                    let template;

                    //It it's an svg file, require it using absolute path
                    if (/\.svg$/.test(tpl)) {

                        tpl = tpl.replace(/(\.\.)?\/?\/?public\/images\/?/, '');

                        //It it's an svg file, replace .svg
                        if (/\.svg$/.test(tpl)) {
                            tpl = tpl.replace('.svg', '');
                        }

                        return new Promise(resolve => {
                            return require.ensure([], require => {
                                template = require(`public/images/${tpl}.svg`);
                                return resolve(template);
                            });
                        });
                    } else {
                        return new Promise(resolve => {
                            return require.ensure([], require => {
                                template = require(`views/${tpl}.dust`);
                                template = dust.loadSource(template);
                                return resolve(template);
                            });
                        });
                    }
                }).then(template => {
                    return cb(null, template);
                }).catch(err => {
                    this.logger.error('[Renderer] Error while parsing resource: ' + tpl, err);
                    return cb(err);
                });
            };
        }
    }

    render(res, template, data) {

        if (__SERVER__) {
            res.locals.__SERVER__ = true;
            return res.render(template, data);
        }

        //render the view for the client
        dust.render(template, data, (err, templateData) => {
            return res.body = templateData;
        });
    }

}

module.exports = Renderer;