var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

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
                loader: 'style-loader!css-loader!sass-loader'
            },
            //Added to resolve => https://github.com/jviotti/ghrequest/issues/3
            /*{
                test: /\.json$/,
                loader: 'json-loader'
            }*/
        ]
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'client.min.js'
    },
    //Added to resolve => https://github.com/jviotti/ghrequest/issues/3
    /*node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },*/
    plugins: debug ? [] : [
        new webpack.optimize.DebugPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        new webpack.HotModuleReplacementPlugin()
    ]
};

console.log(__dirname);