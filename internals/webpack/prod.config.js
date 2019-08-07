const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { rootFolder, targets } = require('./constants');
const baseConfig = require('./base.config');

const plugins = [new webpack.HashedModuleIdsPlugin()];

const getConfig = target =>
  baseConfig({
    target,
    mode: 'production',
    entry: [path.join(rootFolder, 'client/index.js')],
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    },
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

module.exports = targets.map(target => getConfig(target));
