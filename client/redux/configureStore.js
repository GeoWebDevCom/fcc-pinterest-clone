import * as redux from 'redux';
import thunk from 'redux-thunk';
import {userSessionReducer, photosReducer} from 'reducers';

const configureStore = (initialState = {}) => {
  let combinedReducer = reducer || redux.combineReducers({
    userSession: userSessionReducer,
    photos: photosReducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configureStore;
