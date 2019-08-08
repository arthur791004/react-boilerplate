const express = require('express');
const { clientBuild } = require('./constants');
const render = require('./render').default;
const addDevServer = require('./middlewares/addDevServer');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.use(express.static(clientBuild));

if (process.env.NODE_ENV !== 'production') {
  addDevServer(app);
}

app.get('*', (req, res) => {
  const { url } = req;
  const context = {};
  const html = render({
    location: url,
    context,
  });

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.set('content-type', 'text/html');
    res.send(html);
  }
});

app.listen(port, host, error => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    return;
  }

  console.log(`Server started at http://${host}:${port}`); // eslint-disable-line no-console
  console.log('Press Ctrl+C to quit.'); // eslint-disable-line no-console
});
