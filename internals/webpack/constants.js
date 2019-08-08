const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = '/';
const rootFolder = process.cwd();
const clientBuild = path.join(rootFolder, 'build/client');
const serverBuild = path.join(rootFolder, 'build/server');
const assets = path.join(rootFolder, 'server/assets');
const views = path.join(rootFolder, 'server/views');

const serverOptions = {
  name: 'server',
  target: 'node',
  entry: [],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    libraryTarget: 'commonjs2',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: ['@loadable/component', nodeExternals()],
  plugins: [
    new CopyWebpackPlugin([
      {
        from: assets,
        to: clientBuild,
      },
      {
        from: views,
        to: `${serverBuild}/views`,
      },
    ]),
  ],
  optimization: {
    // disable runtimeChunk, otherwise server side render would fail
    runtimeChunk: undefined,
  },
};

const clientOptions = {
  name: 'client',
  target: 'web',
  entry: ['react-hot-loader/patch', path.join(rootFolder, 'client/index.js')],
  plugins: [],
  optimization: {
    runtimeChunk: 'single',
  },
};

const defaultOptions = {
  server: serverOptions,
  client: clientOptions,
};

// ensure the order of names to be [client, server]
const names = [clientOptions.name, serverOptions.name];

module.exports = {
  publicPath,
  rootFolder,
  serverBuild,
  clientBuild,
  defaultOptions,
  names,
};
