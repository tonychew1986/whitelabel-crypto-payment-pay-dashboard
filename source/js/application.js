import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import reducer from './reducers';
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//import Route from './AuthRoute';
//import Login from './Login';
//import Private from './Private';

import Store from './store';
import App from './containers/app'

//const reduxRouterMiddleware = syncHistory(hashHistory);

//import stylesheets here?

let StoreInstance = Store();

ReactDOM.render((
    <Provider store={StoreInstance}>
        <HashRouter>
          <App store={StoreInstance} />
        </HashRouter>
    </Provider>
), document.getElementById('pageApplication'))
