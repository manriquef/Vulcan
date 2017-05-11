import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { reducer } from './AppContainer.js';
import NPTheme from './Layout.jsx';
import PostsPage from '../posts/PostsPage.jsx';

// main path is project name
//let mainPath = '/';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer,
  }),
  global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(),
);

/*
const routes = (
  <Route path={mainPath} component={NPTheme}>
    <IndexRoute component={() => <div>hi</div>} />
  </Route>
);

const isClient = () => ( typeof window !== 'undefined' && window.document);

if (isClient()) {
  // Create an enhanced history that syncs navigation events with the store
	const history = syncHistoryWithStore(browserHistory, store);

	history.listen(location => {
             // do stuff
	});

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app') // eslint-disable-line comma-dangle
  );
}
*/
