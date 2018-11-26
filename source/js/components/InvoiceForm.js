import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class InvoiceForm extends React.Component {
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
          <strong>Request</strong>
          <form onSubmit={(e) => this.props._createInvoice(e)}>
            <div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Merchant Account Id:
                </div>
                <div>
                  <input type="text" name="name" value={this.props.merchantAccountId} onChange={this.props._merchantAccountIdChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Amount:
                </div>
                <div>
                  <input type="text" name="email" value={this.props.amount} onChange={this.props._amountChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Currency:
                </div>
                <div>
                  <input type="text" name="country" value={this.props.currency} onChange={this.props._currencyChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Reference Code:
                </div>
                <div>
                  <input type="text" name="address" value={this.props.referenceCode} onChange={this.props._referenceCodeChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Shop Name:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.shopName} onChange={this.props._shopNameChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Signature:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.signature} onChange={this.props._signatureChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Test mode:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.testMode} onChange={this.props._testModeChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  URL callback:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.urlCallback} onChange={this.props._urlCallbackChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  URL cancel:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.urlCancel} onChange={this.props._urlCancelChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  URL complete:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.urlComplete} onChange={this.props._urlCompleteChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Shipping Address:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.address} onChange={this.props._addressChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer City:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.city} onChange={this.props._cityChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Country:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.country} onChange={this.props._countryChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer State:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.state} onChange={this.props._stateChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Shipping ZIP:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.postalCode} onChange={this.props._postalCodeChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Email:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.email} onChange={this.props._emailChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Name:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.name} onChange={this.props._nameChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Customer Phone:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.mobile} onChange={this.props._mobileChange} required />
                </div>
              </div>
              <div>
                <div className={cx('paymentHighlightTitle')}>
                  Description:
                </div>
                <div>
                  <input type="text" name="mobile" value={this.props.description} onChange={this.props._descriptionChange} required />
                </div>
              </div>
              <div>
                <button name="paynow">
                  Pay now
                </button>
              </div>
            </div>
          </form>


          <div>
            <strong>Response</strong>
            <div>
              <div className={cx('paymentHighlightTitle')}>
                Invoice Id:
              </div>
              <div>
                <input type="text" name="name" value={this.props.invoiceId} required />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
