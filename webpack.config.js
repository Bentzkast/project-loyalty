var path = require('path');
var webpack = require('webpack');
 module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'scripts'),
         filename: 'game.bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };