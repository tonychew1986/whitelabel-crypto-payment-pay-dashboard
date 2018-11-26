import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentIntro extends React.Component {
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
            Welcome to
            <br />
            <strong>Crypto Pay</strong>
          </div>
          <div className={cx('paymentIntroDescription')}>
            <p>
              You have been redirected from our supported merchant's link to fulfill a payment.
            </p>
            <p>
              Please check the payment details on the right before proceeding to the next step.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
