const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { publicPath, rootFolder } = require('./constants');

const defaultEntry = ['react-hot-loader/patch'];

const externals = {
  node: [nodeExternals()],
};

const libraryTarget = {
  node: 'commonjs2',
};

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new HtmlWebpackPlugin({
    template: 'client/html/index.html',
    favicon: 'client/html/favicon.ico',
    filename: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
];

const defaultOptimization = {
  concatenateModules: true,
  splitChunks: {
    chunks: 'all',
  },
  runtimeChunk: 'single',
};

const babelLoader = {
  loader: 'babel-loader',
};

const svgrLoader = {
  loader: '@svgr/webpack',
  options: {
    babel: false,
    svgoConfig: {
      plugins: {
        removeViewBox: false,
      },
    },
  },
};

const urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 1024,
  },
};

const getDefaultOutput = target => ({
  path: path.join(rootFolder, 'build', target),
  publicPath,
  libraryTarget: libraryTarget[target],
});

module.exports = ({
  mode,
  entry,
  output,
  plugins,
  optimization,
  devtool,
  performance = {},
  target = 'web',
  ...options
}) => ({
  mode,
  entry: defaultEntry.concat(entry),
  output: Object.assign(getDefaultOutput(target), output),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader],
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.js$/,
        },
        use: [babelLoader, svgrLoader, urlLoader],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: plugins.concat(defaultPlugins),
  optimization: Object.assign(defaultOptimization, optimization),
  externals: externals[target],
  devtool,
  performance,
  target,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  ...options,
});
