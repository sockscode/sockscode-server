let webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: 'index.tsx',
        vendor: ['material-ui/styles/MuiThemeProvider', 'react', 'react-dom']
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src/public', 'node_modules']        
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ['babel-loader', 'ts-loader'] },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/static' },
            { from: 'node_modules/monaco-editor/min' }
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            mangle: false,
            minimize: false
        })
    ]
};