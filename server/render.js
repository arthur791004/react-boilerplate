import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

const defaultConfig = {
  lang: 'zh-TW',
  location: '/',
  context: {},
};

const render = config => {
  const { lang, location, context, webpackStats } = Object.assign(
    {},
    defaultConfig,
    config
  );
  const [clientStats, serverStats] = webpackStats.stats;
  const serverExtractor = new ChunkExtractor({ stats: serverStats.toJson() });
  const clientExtractor = new ChunkExtractor({ stats: clientStats.toJson() });
  const App = serverExtractor.requireEntrypoint().default;
  const sheet = new ServerStyleSheet();
  const app = clientExtractor.collectChunks(
    <StaticRouter location={location} context={context}>
      <StyleSheetManager sheet={sheet.instance}>
        <App />
      </StyleSheetManager>
    </StaticRouter>
  );

  const html = renderToString(app);
  const links = clientExtractor.getLinkTags();
  const scripts = clientExtractor.getScriptTags();
  const styles = sheet.getStyleTags();

  sheet.seal();

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React Boilerplate</title>
    <link rel="shortcut icon" href="/favicon.ico">
    ${links}
    ${styles}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    ${scripts}
  </body>
</html>
`;
};

module.exports = render;
