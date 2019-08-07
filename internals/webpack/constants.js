const path = require('path');
const nodeExternals = require('webpack-node-externals');

const publicPath = '/';
const rootFolder = process.cwd();
const targets = ['web', 'node'];
const defaultOptions = {
  web: {
    name: 'client',
    defaultEntry: [
      'react-hot-loader/patch',
      path.join(rootFolder, 'client/index.js'),
    ],
    runtimeChunk: 'single',
  },
  node: {
    name: 'server',
    defaultEntry: [path.join(rootFolder, 'client/App.js')],
    externals: ['@loadable/component', nodeExternals()],
    libraryTarget: 'commonjs2',
    // runtimeChunk would cause server side render failed
    runtimeChunk: undefined,
  },
};

module.exports = {
  publicPath,
  rootFolder,
  targets,
  defaultOptions,
};
