const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('webpack');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/assets/index.html`,
    filename: 'index.html',
    inject: 'body',
});

const extractSass = new ExtractTextPlugin({
    filename: '[name].[hash].css',
    disable: process.env.NODE_ENV === 'local',
});

module.exports = {
    entry: { app: `${__dirname}/src/index.js` },
    output: {
        publicPath: '/',
        path: `${__dirname}/dist`,
        filename: `[name].js`,
        pathinfo: process.env.NODE_ENV === 'local',
        sourceMapFilename: '[name].js.map',
        chunkFilename: `[name].bundle.js`,
    },
    devtool: process.env.NODE_ENV !== 'local' ? 'cheap-module-source-map' : 'eval',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' },
        }, {
            test: /\.jsx$/,
            include: /src/,
            use: { loader: 'babel-loader' },
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
                fallback: 'style-loader',
            }),
        }, {
            test: /\.css$/,
            use: extractSass.extract({
                use: [{ loader: 'css-loader' }],
                fallback: 'style-loader',
            }),
        }, {
            test: /\.(png|svg)$/,
            loader: 'url-loader?limit=100000',
        }],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    resolve: {
        modules: ['node_modules', `${__dirname}/src`],
        extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        HTMLWebpackPluginConfig,
        extractSass,
    ],
};
