import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentForm extends React.Component {
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
      <div className={cx('paymentForm')}>
        <div>
          <form onSubmit={(e) => this.props._submitShippingForm(e)}>
            <div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Full Name:
                </div>
                <div>
                  <input type="text" name="name" value={this.props.name} onChange={this.props._nameChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Email:
                </div>
                <div>
                  <input type="email" name="email" value={this.props.email} onChange={this.props._emailChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Country:
                </div>
                <div>
                  <input type="text" name="country" value={this.props.country} onChange={this.props._countryChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Street Address:
                </div>
                <div>
                  <input type="text" name="address" value={this.props.address} onChange={this.props._addressChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Postal Code:
                </div>
                <div>
                  <input type="text" name="postal" value={this.props.postalCode} onChange={this.props._postalCodeChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Mobile Number:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.mobile} onChange={this.props._mobileChange} required />
                </div>
              </div>
              <div>
                <button name="paynow">
                  Pay now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
