import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import GlobalStyle from '@/components/GlobalStyle';
import HomePage from '@/pages/HomePage/Lazy';
import NotFoundPage from '@/pages/NotFoundPage/Lazy';

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/404" component={NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </Fragment>
);

export default hot(App);
