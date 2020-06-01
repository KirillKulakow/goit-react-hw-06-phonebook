import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from './rootModule';

const middleware = [thunk];

const compose = composeWithDevTools(applyMiddleware(...middleware));

export const storeToolKit = createStore(rootReducer, compose);
