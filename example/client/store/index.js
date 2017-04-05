import { createStore, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as LeftMenu } from '../components/LeftMenu';

let composed;

// Compose middleware and devTool
if (window.devToolsExtension) {
  composed = compose(
    window.devToolsExtension()
  );
} else {
  composed = compose();
}

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
    LeftMenu,
  }),
  {},
  composed
);

export default store;
