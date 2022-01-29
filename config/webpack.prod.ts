export {};

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: '/src/index.tsx',
  output: {
    publicPath: '',
    path: paths.build,
    filename: '[name].[hash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(scss|css)$/, use: [MiniCssExtractPlugin.loader, { loader: 'css-modules-typescript-loader' }, { loader: 'css-loader', options: { modules: true } }, { loader: 'sass-loader'}] },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
});