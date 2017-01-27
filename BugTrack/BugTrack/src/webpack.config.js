"use strict";

var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// global css
loaders.push({
    test: /\.css$/,
    exclude: /[\/\\]src[\/\\]/,
    loaders: [
        'style?sourceMap',
        'css'
    ]
});
// local scss modules
loaders.push({
    test: /\.scss$/,
    exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
    loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass'
    ]
});

loaders.push({
    test: /\.less$/,
    exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
    loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
});

// local css modules
loaders.push({
    test: /\.css$/,
    exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
    loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
    ]
});

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "./node_modules/reset.css/reset.css",
        "./src/styles/styles.less",
        "./src/index.jsx"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',

    resolve: {
        extensions: ["", ".js", ".jsx"]
    },

    module: {
        loaders: loaders
    },
    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: './src/template.html'
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    //externals: {
    //    "react": "React",
    //    "react-dom": "ReactDOM"
    //},
};