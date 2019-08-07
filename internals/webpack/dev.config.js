const path = require('path');
const webpack = require('webpack');

const { rootFolder, targets } = require('./constants');
const baseConfig = require('./base.config');

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const getConfig = target =>
  baseConfig({
    target,
    mode: 'development',
    entry: [
      'webpack-hot-middleware/client',
      path.join(rootFolder, 'client/index.js'),
    ],
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    plugins,
    optimization: {
      minimize: false,
    },
    performance: {
      hints: false,
    },
    devtool: 'cheap-module-source-map',
  });

module.exports = targets.map(target => getConfig(target));
