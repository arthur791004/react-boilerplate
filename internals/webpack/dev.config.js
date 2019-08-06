const path = require('path');
const webpack = require('webpack');

const rootFolder = process.cwd();
const plugins = [new webpack.NamedModulesPlugin()];

module.exports = require('./base.config')({
  mode: 'development',
  entry: [path.join(rootFolder, 'client/index.js')],
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
  devServer: {
    contentBase: path.join(rootFolder, 'build'),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
});
