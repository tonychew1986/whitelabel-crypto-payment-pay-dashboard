import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentShippingIntro extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }

  _sampleFunction = () => {

  }

  render() {
    return (
      <div className={cx('paymentIntro')}>
        <div>
          <div className={cx('paymentIntroTitle')}>
            <strong>One more step</strong>
            <br />
            before making payment
          </div>
          <div className={cx('paymentIntroDescription')}>
            <p>
              Please fill in your shipping particulars so that we may fulfill your order and pass it on to the merchant
            </p>
            <p>
              Rest assure that all information are only securely shared with the merchant.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
