const path = require('path');
const express = require('express');

const app = express();

const rootFolder = process.cwd();
const buildFolder = path.join(rootFolder, 'build', 'web');
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

  const compiler = {
    server: webpack(serverConfig),
    client: webpack(clientConfig),
  };

  const webpackDevMiddlewareOptions = {
    logLevel: 'error',
    publicPath: clientConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  app.use(webpackDevMiddleware(compiler.client, webpackDevMiddlewareOptions));
  app.use(webpackHotMiddleware(compiler.client));
}

app.use(express.static(buildFolder));

app.get('*', (_, res) => {
  res.sendFile(path.join(buildFolder, 'index.html'));
});

app.listen(port, host, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  console.log(`Server started at http://${host}:${port}`); // eslint-disable-line no-console
  console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-console
});
