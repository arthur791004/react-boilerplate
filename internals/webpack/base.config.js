const path = require('path');
const webpack = require('webpack');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');

const { publicPath, rootFolder, defaultOptions } = require('./constants');

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

module.exports = ({
  mode,
  entry = [],
  output = {},
  plugins = [],
  optimization = {},
  devtool,
  performance = {},
  target = 'web',
  ...options
}) => {
  const {
    name,
    defaultEntry,
    externals,
    libraryTarget,
    runtimeChunk,
  } = defaultOptions[target];

  return {
    mode,
    name,
    entry: [...entry, ...defaultEntry],
    output: {
      path: path.join(rootFolder, 'build', target),
      publicPath,
      libraryTarget,
      ...output,
    },
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          __SERVER__: target === 'node',
        },
      }),
      new LoadableWebpackPlugin(),
      ...plugins,
    ],
    optimization: {
      concatenateModules: true,
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk,
      ...optimization,
    },
    externals,
    devtool,
    performance,
    target,
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    ...options,
  };
};
