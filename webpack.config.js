const path = require('path');
const webpack = require('webpack');

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
            }
        ]
    },

    plugins: [

        //Teach Webpack about magic globals
        new webpack.DefinePlugin({
            __SERVER__: 'false',
        }),
    ]

};