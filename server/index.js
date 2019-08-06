const path = require('path');
const express = require('express');

const app = express();

const rootFolder = process.cwd();
const buildFolder = path.join(rootFolder, 'build');
const host = '127.0.0.1';
const port = 3000;

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
