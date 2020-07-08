import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {devToolsEnhancer} from 'redux-devtools-extension';

import api from '../api';
import * as schema from './schema';

import rootReducer from './reducers';

const middleware = applyMiddleware(thunk.withExtraArgument({api, schema}));

const store = createStore(rootReducer, compose(middleware, devToolsEnhancer()));

export default store;
