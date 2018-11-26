import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentDetails extends React.Component {
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
      <div className={cx('paymentDescription')}>
        <div>
          <div className={cx('paymentDescriptionEntry')}>
            <div className={cx('paymentHighlightTitle')}>
              Merchant name
            </div>
            <div className={cx('num', 'paymentHighlight')}>
              {this.props.merchantName}
            </div>
          </div>
          <div className={cx('paymentDescriptionEntry')}>
            <div className={cx('paymentHighlightTitle')}>
              Merchant Id
            </div>
            <div className={cx('num', 'paymentHighlight')}>
              {this.props.merchantId}
            </div>
          </div>
          <div className={cx('paymentDescriptionEntry')}>
            <div className={cx('paymentHighlightTitle')}>
              Product Reference Code
            </div>
            <div className={cx('paymentHighlight')}>
              {this.props.productReference}
            </div>
          </div>
          <div className={cx('paymentDescriptionEntry')}>
            <div className={cx('paymentHighlightTitle')}>
              Dollar Value <span className={cx('currency')}>({this.props.fiatCurrency})</span>
            </div>
            <div className={cx('num', 'paymentHighlight')}>
              ${this.props.dollarValuePayAmount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
