const path = require('path');
const OptimizeCSSAssetsPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

DIST_PATH = path.resolve(__dirname, "build")

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    entry: './src/js/index.ts',
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
                use: [
                    OptimizeCSSAssetsPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    OptimizeCSSAssetsPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: 'sprite.svg'
                        }
                    },
                    'svgo-loader'
                ]
            }
        ],
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            filename: '[name].min.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/demo.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/favicon.ico', to: 'favicon.ico' },
            ],
        }),
        new SvgSpriteLoaderPlugin({
            plainSprite: true
        })
    ],
};