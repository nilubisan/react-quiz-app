export {};
const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
          test: /\.(scss|css)$/, use: ['style-loader', { loader: "css-modules-typescript-loader"}, { loader: 'css-loader', options: { modules: true } }]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
});