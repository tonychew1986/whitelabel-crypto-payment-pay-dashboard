import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import Countdown from 'react-countdown-now';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentInvoiceFooter extends React.Component {
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
      <div className={cx('paymentInvoiceFooter')}>
        <div>
          <div className={cx('paymentInvoiceFooterCreated')}>
            Created: <span>{moment(this.props.createdAt).format("YYYY-MM-DD HH:mm")}</span>
          </div>
          <div className={cx('paymentInvoiceFooterButton', ((this.props.epochDifference <= 0) ? "" : "hide"))}>
            <a href={this.props.urlCancel}>
              <button>
                Back to Merchant
              </button>
            </a>
          </div>
          <div className={cx('paymentInvoiceFooterButton', ((this.props.epochDifference <= 0) ? "hide" : ""))}>
            <a href={this.props.urlCancel}>
              <button>
                Cancel
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
