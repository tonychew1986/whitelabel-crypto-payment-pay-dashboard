import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as pageActions from '../actions/home';

import axios from 'axios';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);


////

class PageIndex extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
      }
  }

  componentDidMount(){
    this.props.appActions.checkInterfaceScheme();
  }

  _sampleFunction = (e) => {

  }


  render() {
    let logoImg = "../img/aropay.png";

    if(this.props.app.logo == "" || this.props.app.logo == undefined){
      logoImg = "../img/aropay.png";
    }else{
      logoImg = "../img/"+this.props.app.logo;
    }

    return (
      <div className={cx('page')}>
        <div className={cx('paymentWrapper')}>
          <div className={cx('indexIntro')}>
            <div className={cx('indexIntroLogo')}>
              <img src={logoImg} />
            </div>
            <div className={cx('indexIntroSubtitle')}>
              Cryptocurrency Payment Gateway
            </div>
            <div>
              <Link to="/transaction/check">
                <button>
                  Check Transaction Status
                </button>
              </Link>
            </div>
          </div>
          <div className={cx('clear')}></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
    return {
        app: state.app,
        page: state.home
    };
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageIndex);
