const webpack = require('webpack');

const { targets } = require('./constants');
const baseConfig = require('./base.config');

const entries = {
  web: ['webpack-hot-middleware/client'],
};

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const getConfig = target =>
  baseConfig({
    target,
    mode: 'development',
    entry: entries[target],
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
