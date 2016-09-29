var config = require('./public/config/config');
var debug = config.webpackEnv !== "production";
var webpack = require('webpack');
console.log('debugging?');
console.log(debug);

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: './public/js/client.js',

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],

        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'

            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?minimize!sass-loader'
            },

            { test: /\.css$/, loader: "style-loader!css-loader" },

        ]
    },

    output: {
        path: __dirname + '/public/js',
        filename: 'client.min.js'
    },
    devServer: {
        //This is added to server index.thml for all urls. It must be disabled to server 404s
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: debug ? [] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        })
    ]
};

console.log(__dirname);