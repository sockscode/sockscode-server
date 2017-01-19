let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./config/webpack.config');
let path = require('path');
let server = require('./index.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: path.resolve('dist'),
  proxy: {
    '/code/*': {
      target: 'http://localhost:5000',
      ws: true
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});