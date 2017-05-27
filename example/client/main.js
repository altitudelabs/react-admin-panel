import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './main.scss';
import './favicon.ico';

import store from './store';
import App from './components/App';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const browserHistory = createHistory();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Router history={history} basename={'/template-react'}>
      <Route
        path={'/'}
        onChange={(prevState, nextState) => {
          if (nextState.location.action !== 'POP') {
            window.scrollTo(0, 0);
          }
        }}
        render={() => {
          return (
            <div>
              <Route path="*" component={App} />
            </div>
          );
        }}
      />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
