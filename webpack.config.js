var webpack = require('webpack');
var __DEV__ = process.env.NODE_ENV === 'development';
module.exports = {
  target: 'web',
  debug: __DEV__,
  devtool: __DEV__ ? 'eval' : false,
  module: {
    noParse: ['/^fb$/'],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          only: ['src/**'],
          modules: 'common',
          optional: [
            'es7.classProperties',
            'es7.decorators',
            'es7.objectRestSpread',
            'runtime',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(__DEV__ ? 'development' : 'production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
  ],
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
