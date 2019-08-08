const path = require('path');
const nodeExternals = require('webpack-node-externals');

const publicPath = '/';
const rootFolder = process.cwd();

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
  optimization: {
    // disable runtimeChunk, otherwise server side render would fail
    runtimeChunk: undefined,
  },
};

const clientOptions = {
  name: 'client',
  target: 'web',
  entry: ['react-hot-loader/patch', path.join(rootFolder, 'client/index.js')],
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
  defaultOptions,
  names,
};
