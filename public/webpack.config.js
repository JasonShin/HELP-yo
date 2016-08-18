var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: './js/client.js',
    output: {
        path: __dirname + '/js',
        filename: 'client.min.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DebugPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};