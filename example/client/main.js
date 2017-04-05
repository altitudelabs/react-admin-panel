import './main.scss';
import './favicon.ico';
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
import store from './store';
import { createHistory } from 'history';

import App from './components/App';
import {
  action as LeftMenuAction,
} from './components/LeftMenu';
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
      <Route
        path={'/'}
        onChange={(prevState, nextState) => {
          if (nextState.location.action !== 'POP') {
            window.scrollTo(0, 0);
          }
          LeftMenuAction.close();
        }}
      >
        <IndexRoute component={App} />
        <Route path="*" component={App} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
