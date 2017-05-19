import React from 'react';
import { render } from 'react-dom';
import {
  IndexRoute,
  // IndexRedirect,
  Router,
  Route,
  // browserHistory,
  useRouterHistory,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createHistory } from 'history';

import './main.scss';
import './favicon.ico';

import store from './store';
import App from './components/App';
import ListTransaction from './components/Transaction/List';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const browserHistory = useRouterHistory(createHistory)({
  // NOTE for gh-pages
  basename: '/react-admin-panel',
});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Router history={history}>
      <Route path={'/'} >
        <IndexRoute component={App} />
        <Route path="*" component={App} />
        <Route path="admin/transactions" component={ListTransaction} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
