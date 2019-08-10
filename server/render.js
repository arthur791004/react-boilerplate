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

  return {
    app,
    lang,
    links,
    scripts,
    styles,
  };
};

export default render;
