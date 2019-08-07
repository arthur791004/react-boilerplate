const express = require('express');
const { clientBuild, serverBuild } = require('./constants');
const render = require('./render');

const app = express();
const host = '127.0.0.1';
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const [
    clientConfig,
    serverConfig,
  ] = require('../internals/webpack/dev.config');
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers.find(
    ({ name }) => name === 'client'
  );
  const webpackDevMiddlewareOptions = {
    logLevel: 'error',
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true, // this feature is experimental
    watchOptions: {
      ignored: /node_modules/,
    },
    writeToDisk: filePath => new RegExp(serverBuild).test(filePath),
  };

  app.use(webpackDevMiddleware(compiler, webpackDevMiddlewareOptions));

  // only use clientCompiler, otherwise hot reload would fail
  app.use(webpackHotMiddleware(clientCompiler));
}

app.use(express.static(clientBuild));

app.get('*', (req, res) => {
  const { url } = req;
  const { webpackStats } = res.locals;
  const config = {
    webpackStats,
    location: url,
  };

  res.set('content-type', 'text/html');
  res.send(render(config));
});

app.listen(port, host, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  console.log(`Server started at http://${host}:${port}`); // eslint-disable-line no-console
  console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-console
});
