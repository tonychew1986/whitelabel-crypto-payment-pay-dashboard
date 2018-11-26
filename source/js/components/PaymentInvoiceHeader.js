import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import Countdown from 'react-countdown-now';
import moment from 'moment';
import commaNumber from 'comma-number';
import { SyncLoader } from 'react-spinners';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentInvoiceHeader extends React.Component {
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
    let payableDisplay;
    let dollarValueConvertedDisplay;

    if(this.props.fiatCurrency == this.props.fiatCurrencySelected){
      dollarValueConvertedDisplay = this.props.amount;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else if(this.props.fiatCurrency == "usd" && this.props.fiatCurrencySelected == "sgd"){
      dollarValueConvertedDisplay = this.props.amount * this.props.USDSGD;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else if(this.props.fiatCurrency == "sgd" && this.props.fiatCurrencySelected == "usd"){
      dollarValueConvertedDisplay = this.props.amount / this.props.USDSGD;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else{
      dollarValueConvertedDisplay = this.props.amount;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }

    return (
      <div className={cx('paymentInvoiceHeader')}>
        <div className={cx('paymentInvoiceHeaderLeft')}>
          <div className={cx('paymentInvoiceHeaderName')}>
            {this.props.merchantName}
          </div>
          <div className={cx('paymentInvoiceHeaderId')}>
            {this.props.merchantId}
          </div>
          <div className={cx('paymentInvoiceHeaderDescription')}>
            {this.props.description}
          </div>
        </div>
        <div className={cx('paymentInvoiceHeaderRight', ((this.props.paymentExpired == true) ? "hide" : ""))}>
          <div className={cx('paymentInvoiceHeaderRightFigures')}>
            <div>
              <span className={cx('num')}>
                {((this.props.selectedCryptocurrency == "BTC")  ?
                  (this.props.amountBTC) + ' '
                  : '')}
                {((this.props.selectedCryptocurrency == "ETH")  ?
                  (this.props.amountETH) + ' '
                  : '')}
                {((this.props.selectedCryptocurrency == "LTC")  ?
                  (this.props.amountLTC) + ' '
                  : '')}
              </span>
              <span>
                {this.props.selectedCryptocurrency}
              </span>
            </div>
            <div>
              <div className={cx('num')}>
                <span className={cx('currency')}>{this.props.fiatCurrencySelected}</span> $
                  {payableDisplay}
              </div>
            </div>
          </div>
          <div className={cx('paymentInvoiceHeaderRightIcon')}>
            {((this.props.selectedCryptocurrency == "BTC")  ? <img src="../img/bitcoin.png" /> : '')}
            {((this.props.selectedCryptocurrency == "ETH")  ? <img src="../img/ether.png" />  : '')}
            {((this.props.selectedCryptocurrency == "LTC")  ? <img src="../img/litecoin.png" />  : '')}

          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
