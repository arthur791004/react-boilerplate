const path = require('path');
const webpack = require('webpack');

const { names, rootFolder } = require('./constants');
const baseConfig = require('./base.config');

const options = {
  server: {
    entry: [path.join(rootFolder, 'client/App.js')],
  },
  client: {
    entry: ['webpack-hot-middleware/client'],
  },
};

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const getConfig = (name, { entry }) =>
  baseConfig({
    name,
    mode: 'development',
    entry,
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

module.exports = names.map(name => getConfig(name, options[name]));
