const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

ENTRY_PATH = path.resolve(__dirname, "src/index")
DIST_PATH = path.resolve(__dirname, "dist")

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
        main: ENTRY_PATH,
    },
    output: {
        path: DIST_PATH,
        filename: 'audio-recorder-plugin.min.js',
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
        new MiniCssExtractPlugin({
            filename: 'audio-recorder.min.css',
        }),
    ]
};