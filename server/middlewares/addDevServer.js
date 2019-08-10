const addDevServer = app => {
  /* eslint-disable import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const [
    clientConfig,
    serverConfig,
  ] = require('../../internals/webpack/dev.config');
  const { serverBuild, statsFilename } = require('../constants');
  /* eslint-enable import/no-extraneous-dependencies */

  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers.find(
    ({ name }) => name === 'client'
  );
  const webpackDevMiddlewareOptions = {
    logLevel: 'error',
    publicPath: clientConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/,
    },
    writeToDisk: filePath =>
      new RegExp(serverBuild).test(filePath) ||
      new RegExp(statsFilename).test(filePath),
  };

  app.use(webpackDevMiddleware(compiler, webpackDevMiddlewareOptions));

  // only use clientCompiler, otherwise hot reload would fail
  app.use(webpackHotMiddleware(clientCompiler));
};

module.exports = addDevServer;
