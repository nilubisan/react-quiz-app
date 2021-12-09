export {};
const ASSET_PATH = process.env.ASSET_PATH || '/';
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: '/src/index.tsx',
  output: {
    publicPath: '/',
    path: paths.build,
    filename: '[name].[hash].js',
  },
  plugins: [
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.public,
    //       to: 'assets',
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: 'Test page',
      template: `${paths.src}/template.html`,
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: ['ts-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff|woff2|ttf|otf)$/i, type: 'asset/resource' },

    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    alias: {
      '@': paths.src,
    },
  },
};