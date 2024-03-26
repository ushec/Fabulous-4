const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/server/index.js'),
        style: path.resolve(__dirname, 'src/sass/main.scss'),
    },
    output: {
        path: path.resolve(__dirname, 'public'), // Output directory
        filename: '[name].js', // Output file name
        publicPath: '/', // Specify the public URL of the output directory when referenced in a browser
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['html-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Resolve @import and url() like import/require()
                    'sass-loader', // Compile Sass to CSS
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output CSS file name
        }),
    ],
    resolve: {
        modules: ['node_modules'], // Fix: Remove unnecessary ellipsis
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false,
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
          "buffer": require.resolve("buffer/"),
          "process": require.resolve("process/browser"),
          "timers": require.resolve("timers-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "querystring": require.resolve("querystring-es3"),
          async_hooks: false,
          assert: false
        },
    }, // Fix: Add comma after closing bracket
};
