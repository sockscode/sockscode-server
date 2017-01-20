let webpack = require('webpack');
let path = require('path');
let WebpackNotifierPlugin = require('webpack-notifier');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    // Add the react hot loader entry point - in reality, you only want this in your dev Webpack config
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'index.tsx'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesDirectories: ['src/public', 'node_modules'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ['babel', 'ts-loader'] },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  },
  plugins: [
    // Add the Webpack HMR plugin so it will notify the browser when the app code changes
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/static' },
      { from: 'node_modules/monaco-editor/dev' }
    ])
  ]
};