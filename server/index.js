const path = require('path');
const express = require('express');
const compression = require('compression');
const exphbs = require('express-handlebars');
const { clientBuild } = require('../internals/webpack/constants');
const render = require('./render').default;
const addDevServer = require('./middlewares/addDevServer');

const app = express();
const host = '127.0.0.1';
const port = 3000;

app.use(compression());
app.use(express.static(clientBuild));
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: false }));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, './views'));

if (process.env.NODE_ENV !== 'production') {
  addDevServer(app);
}

app.get('*', (req, res) => {
  const { url } = req;
  const context = {};
  const renderOptions = render({
    location: url,
    context,
  });

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.render('index', renderOptions);
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
