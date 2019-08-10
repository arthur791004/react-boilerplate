import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { loadableReady } from '@loadable/component';

import App from './App';

const container = document.getElementById('root');

loadableReady(() => {
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  hydrate(app, container);
});
