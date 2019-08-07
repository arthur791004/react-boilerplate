const path = require('path');
const webpack = require('webpack');

const rootFolder = process.cwd();
const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = require('./base.config')({
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
