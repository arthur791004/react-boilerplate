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
  name,
  entry = [],
  output = {},
  plugins = [],
  optimization = {},
  devtool,
  performance = {},
  ...options
}) => {
  const {
    entry: defaultEntry,
    output: defaultOutput,
    node,
    externals,
    target,
  } = defaultOptions[name];

  return {
    mode,
    name,
    entry: [...entry, ...defaultEntry],
    output: {
      path: path.join(rootFolder, 'build', name),
      publicPath,
      ...defaultOutput,
      ...output,
    },
    node,
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
          IS_SERVER: name === 'server',
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
