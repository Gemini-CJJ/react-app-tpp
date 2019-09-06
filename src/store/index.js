import {createStore, applyMiddleware, compose} from "redux";
import reductor from './reductors';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reductor,
  // composeEnhancers( applyMiddleware() )
);

export default store;
