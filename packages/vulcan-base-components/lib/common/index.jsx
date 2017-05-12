import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { reducer } from './AppContainer.js';
import Layout from './Layout.jsx';


// main path is project name
//let mainPath = '/';

/*
const routes = (
  <Route path={mainPath} component={Layout}>
    <IndexRoute component={Documentation} />
  </Route>
);

  // Create an enhanced history that syncs navigation events with the store


  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app') // eslint-disable-line comma-dangle
  );
}*/
