import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Router, Switch, Redirect, Link } from 'react-router-dom';

import axios from 'axios';

//import '../../scss/commons.scss';

import classnames from 'classnames/bind';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';

//import PrivateRoute from './PrivateRoute';

import PageIndex from './route-index';
import PageTransactionCheck from './route-transactionCheck';

import PageInvoiceAdd from './route-invoiceAdd';
import PageInvoice from './route-invoice';


const isAuthenticated = () => true;

//const PRIVATE_ROOT = '/private';
const PUBLIC_ROOT = '/login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isPrivate } = component;
  if (isAuthenticated()) {
    //User is Authenticated
    //if (isPrivate === true) {
      //If the route is private the user may proceed.
      return <Route { ...props } component={ component } />;
    //}else {
      //If the route is public, the user is redirected to the app's private root.
      //return <Redirect to={ PRIVATE_ROOT } />;
    //}
  }else {
    //User is not Authenticated
    if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }else {
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
  }
};

const EmptyLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      <div>
        <Component {...props} />
      </div>
    )} />
  )
};

const PortalLayout = ({component: Component, authed, ...rest}) => {
  //const { isPrivate } = component;

  //if (authed === true) {
    //User is Authenticated
    //if (isPrivate === true) {
      //If the route is private the user may proceed.
      return (
        <Route {...rest} render={props => (
          <div className="uiWrapper">
            <Component {...props} />
          </div>
        )} />
      )
    //}else {
      //If the route is public, the user is redirected to the app's private root.
      //return <Redirect to={ PRIVATE_ROOT } />;
    //}
  //}else {
    //User is not Authenticated
    //if (isPrivate === true) {
      //If the route is private the user is redirected to the app's public root.
      //return <Redirect to={ PUBLIC_ROOT } />;
    //}else {
      //If the route is public, the user may proceed.
      //return <Route { ...props } component={ component } />;
    //}
  //}
};

//export const getRoutes = (store) => (
//  const authRequired = (nextState, replaceState) => {
//    // Now you can access the store object here.
//    const state = store.getState();
//
//    //if (!state.user.isAuthenticated) {
//    //  // Not authenticated, redirect to login.
//    //  replaceState({ nextPathname: nextState.location.pathname }, '/login');
//    //}
//  };
//
//  //return (
//  //  <Route   path="/"         component={App}>
//  //    <IndexRoute             component={Landing} />
//  //    <Route path="learn"     component={Learn} />
//  //    <Route path="about"     component={About} />
//  //    <Route path="downloads" component={Downloads} onEnter={authRequired} />
//  //  </Route>
//  //);
//)

//var requireAuth = (store, nextState, replace) => {
//  console.log("store: ", store);
//  //now you have access to the store in the onEnter hook!
//}

class App extends Component {
//const App = (store) => (
  constructor(props, context) {
    super(props, context);

    this.state={
      authed: true
    }
  }
  componentDidUpdate() {
    window.scrollTo(0,0);
    console.log("componentDidUpdate");
    //console.log(this.state.app.loginStatus);
  }
  render() {
    return (
      <div className={cx('App')}>

        <Switch>
          <PortalLayout exact path='/' component={PageIndex} />
          <PortalLayout exact path='/transaction/check' component={PageTransactionCheck} />

          <PortalLayout exact path='/invoiceAdd' component={PageInvoiceAdd} />
          <PortalLayout exact path='/invoice/:invoiceId' component={PageInvoice} />
        </Switch>

      </div>
    )
  }
}

const NotFound = () => (<h1>404.. This page is not found!</h1>)

export default App
