const path = require('path');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const DIST_DIR = 'public'

module.exports = {
    entry: {
        '/js/app.bundle' : './client.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        modules: ['node_modules', path.resolve('.')],
        alias: {
            //We need to use dust-helpers in for client side rendering
            //use an alias to tell webpack how to resolve dust.core expectation
            'dust.core': 'dustjs-linkedin',
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.dust$/,
                loader: 'dust-loader'
            },
            // Adds optimised svg files to the bundle as dust templates
            { test: /\.svg$/, use: { loader: 'dust-loader' } }
        ]
    },

    plugins: [

        //Teach Webpack about magic globals
        new webpack.DefinePlugin({
            __SERVER__: 'false',
        }),

        new SWPrecacheWebpackPlugin({
            filename: 'sw.js',
            staticFileGlobs: [
                `${DIST_DIR}/js/*.js`, //only precache js files, other files will be cached on request
                `${DIST_DIR}/*.js`, //only precache js files, other files will be cached on request
                `${DIST_DIR}/css/*.js`, //only precache js files, other files will be cached on request
                `${DIST_DIR}/images/*.js`, //only precache js files, other files will be cached on request

            ],
            importScripts: [
                'sw-toolbox.js',
            ],
            stripPrefix: DIST_DIR,
            mergeStaticsConfig: true,
            staticFileGlobsIgnorePatterns: [/\.map$/],
            runtimeCaching: [{
                urlPattern: /.*/,
                handler: 'cacheFirst',
                options: {
                    cache: {
                        maxEntries: 10,
                        name: 'static-cache'
                    }
                }
            }]
        }),

        new WebpackPwaManifest({
            filename: 'manifest.json',
            fingerprints: false,
            dir: 'ltr',
            lang: 'en',
            name: 'Setup Up!',
            short_name: 'Step Up!',
            description: '',
            icons: [{
                src: path.resolve('assets/images/logo.png'),
                destination: path.join('images', 'manifest'),
                sizes: [48, 72, 96, 128, 192, 256, 384, 512]
            }],
            theme_color: '#e8233e',
            orientation: 'portrait',
            serviceworker: {
                src: '/sw.js',
                scope: '/',
                use_cache: false
            },
        })
    ]

};