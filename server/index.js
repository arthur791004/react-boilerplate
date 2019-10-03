const path = require('path');
const express = require('express');
const { buildPath } = require('./constants');
const addDevServer = require('./middlewares/addDevServer');

const app = express();

const host = '127.0.0.1';
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
  addDevServer(app);
}

app.use(express.static(buildPath));

app.get('*', (_, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, host, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  console.log(`Server started at http://${host}:${port}`); // eslint-disable-line no-console
  console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-console
});
