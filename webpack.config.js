const path = require('path');
const OptimizeCSSAssetsPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

DIST_PATH = path.resolve(__dirname, "build")

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
        plugin: './lib/audioRecorder.ts',
        demo: './src/demo.ts'
    },
    output: {
        path: DIST_PATH,
        filename: '[name].min.js',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            filename: 'demo.min.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/demo.html',
            inject: 'body'
        })
    ],
};