import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { serverStatsFile, clientStatsFile } from './constants';

const defaultConfig = {
  lang: 'zh-TW',
  location: '/',
  context: {},
};

const getApp = () =>
  process.env.NODE_ENV === 'production'
    ? require('@/App')
    : new ChunkExtractor({ statsFile: serverStatsFile }).requireEntrypoint();

const render = config => {
  const { lang, location, context } = Object.assign({}, defaultConfig, config);
  const extractor = new ChunkExtractor({ statsFile: clientStatsFile });
  const App = getApp().default;
  const sheet = new ServerStyleSheet();
  const app = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={location} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const links = extractor.getLinkTags();
  const scripts = extractor.getScriptTags();
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
    <div id="root">${app}</div>
    ${scripts}
  </body>
</html>
`;
};

export default render;
