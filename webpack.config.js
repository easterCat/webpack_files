/**
 * Created by Dion on 2017/4/28.
 */
const production = (process.env.NODE_ENV === 'production');
const path = require('path');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const cssPlugin = new ExtractPlugin({
    filename: '[name].css',
    allChunks: true // don't contain embedded styles
});

let plugins = [
    cssPlugin,
    new webpack.LoaderOptionsPlugin({debug: !production}),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new CopyWebpackPlugin([
        {
            from: './lib/pure',
            to: './lib/pure'
        },
    ]),
    new webpack.ProvidePlugin({
        '$': "jquery",
        'jQuery': "jquery",
        "window.jQuery": "jquery",
        "moment": "moment"
    })
];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                mangle: false
            },
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: false,
                if_return: true,
                join_vars: true,
                drop_console: false,
                warnings: false
            }
        }),
        // new webpack.optimize.DedupePlugin(),
        new CleanPlugin(['dist', 'dist.zip'], {exclude: ['lib']}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 50 * 1000}), //50kb
        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]);
}

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        official: './official.js',
        download: './download.js',
        pricing: './pricing.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'lib'), path.resolve(__dirname, 'node_modules')]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        chunkFilename: '[id].[name].js',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: production ?
                    'babel-loader?cacheDirectory&presets[]=env!strip-loader?strip[]=console.log' :
                    'babel-loader?cacheDirectory&presets[]=env'
            },
            {
                test: /\.scss$/,
                loaders: production ?
                    cssPlugin.extract(['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']) :
                    'style-loader!css-loader?sourceMap!sass-loader?sourceMap=true&outputStyle=expanded&sourceMapContents=true'
            },
            {
                test: /\.css$/,
                loaders: cssPlugin.extract('css-loader')
            },
            {
                test: path.resolve(__dirname, 'official.html'),
                loaders: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
            },
            {
                test: path.resolve(__dirname, 'pricing.html'),
                loaders: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
            },
            {
                test: path.resolve(__dirname, 'download.html'),
                loaders: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: 'url-loader?name=images/[name].[ext]&limit=10000!image-webpack-loader&bypassOnDebug'
            },
        ]
    },
    plugins: plugins,
    devtool: production ? false : 'source-map'
};