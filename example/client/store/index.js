import { createStore, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';

let composed;

// Compose middleware and devTool
if (window.devToolsExtension) {
  composed = compose(
    window.devToolsExtension(),
  );
} else {
  composed = compose();
}

// Add routerReducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer,
  }),
  {},
  composed,
);

export default store;
