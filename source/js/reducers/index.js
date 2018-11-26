import app from './app';
import home from './home';

import { reducer as formReducer } from 'redux-form'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    app,
    home,
    form: formReducer,
    routing: routerReducer
});
export default rootReducer;
