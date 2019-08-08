const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { names, rootFolder } = require('./constants');
const baseConfig = require('./base.config');

const options = {
  server: {
    entry: [path.join(rootFolder, 'server/index.js')],
    output: {
      filename: 'index.js',
      chunkFilename: '[name].chunk.js',
    },
  },
  client: {
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    },
  },
};

const plugins = [new webpack.HashedModuleIdsPlugin()];

const getConfig = (name, { entry, output }) =>
  baseConfig({
    name,
    mode: 'production',
    entry,
    output,
    plugins,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          cache: false,
        }),
      ],
    },
  });

module.exports = names.map(name => getConfig(name, options[name]));
