import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';
import commaNumber from 'comma-number';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);


export default class PaymentCryptocurrencySelection extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    }
  }
  componentDidMount(){

  }


  render() {
    let priceDisplay;
    let amountToPayDisplay;
    let payableDisplay;
    let priceBTCDisplay;
    let priceETHDisplay;
    let priceLTCDisplay;
    let dollarValueConvertedDisplay;

    if(this.props.fiatCurrency == this.props.fiatCurrencySelected){
      dollarValueConvertedDisplay = this.props.dollarValuePayAmount;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else if(this.props.fiatCurrency == "usd" && this.props.fiatCurrencySelected == "sgd"){
      dollarValueConvertedDisplay = this.props.dollarValuePayAmount * this.props.USDSGD;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else if(this.props.fiatCurrency == "sgd" && this.props.fiatCurrencySelected == "usd"){
      dollarValueConvertedDisplay = this.props.dollarValuePayAmount / this.props.USDSGD;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }else{
      dollarValueConvertedDisplay = this.props.dollarValuePayAmount;

      payableDisplay = (
        <span>
          {commaNumber(parseFloat(dollarValueConvertedDisplay).toFixed(2))}
        </span>
      )
    }

    if(this.props.fiatCurrencySelected == "usd"){
      priceBTCDisplay = (Math.ceil(this.props.priceBTC*100)/100);
      priceETHDisplay = (Math.ceil(this.props.priceETH*100)/100);
      priceLTCDisplay = (Math.ceil(this.props.priceLTC*100)/100);

      priceDisplay = (
        <span>
          {((this.props.selectedCryptocurrency == "BTC")  ? commaNumber((priceBTCDisplay)) : '')}
          {((this.props.selectedCryptocurrency == "ETH")  ? commaNumber((priceETHDisplay)) : '')}
          {((this.props.selectedCryptocurrency == "LTC")  ? commaNumber((priceLTCDisplay)) : '')}
        </span>
      )
      amountToPayDisplay = (
        <span>
          {((this.props.selectedCryptocurrency == "BTC" && this.props.priceBTC > 0)  ?
            ((this.props.dollarValuePayAmount/priceBTCDisplay).toFixed(6)) + ' '
            : '')}
          {((this.props.selectedCryptocurrency == "ETH" && this.props.priceETH > 0)  ?
            ((this.props.dollarValuePayAmount/priceETHDisplay).toFixed(6)) + ' '
            : '')}
          {((this.props.selectedCryptocurrency == "LTC" && this.props.priceLTC > 0)  ?
            ((this.props.dollarValuePayAmount/priceLTCDisplay).toFixed(6)) + ' '
            : '')}
        </span>
      )
    }else{
      //sgd
      priceBTCDisplay = (this.props.priceBTC * this.props.USDSGD).toFixed(2);
      priceETHDisplay = (this.props.priceETH * this.props.USDSGD).toFixed(2);
      priceLTCDisplay = (this.props.priceLTC * this.props.USDSGD).toFixed(2);

      priceDisplay = (
        <span>
          {((this.props.selectedCryptocurrency == "BTC")  ? commaNumber((priceBTCDisplay)) : '')}
          {((this.props.selectedCryptocurrency == "ETH")  ? commaNumber((priceETHDisplay)) : '')}
          {((this.props.selectedCryptocurrency == "LTC")  ? commaNumber((priceLTCDisplay)) : '')}
        </span>
      )
      amountToPayDisplay = (
        <span>
          {((this.props.selectedCryptocurrency == "BTC" && this.props.priceBTC > 0)  ?
            ((this.props.dollarValuePayAmount/priceBTCDisplay).toFixed(6)) + ' '
            : '')}
          {((this.props.selectedCryptocurrency == "ETH" && this.props.priceETH > 0)  ?
            ((this.props.dollarValuePayAmount/priceETHDisplay).toFixed(6)) + ' '
            : '')}
          {((this.props.selectedCryptocurrency == "LTC" && this.props.priceLTC > 0)  ?
            ((this.props.dollarValuePayAmount/priceLTCDisplay).toFixed(6)) + ' '
            : '')}
        </span>
      )
    }


    return (
      <div className={cx('paymentCryptocurrencySelection', ((this.props.paymentStatus)  ? 'disabled' : ''))}>
        <div className={cx('paymentCryptocurrencySelectionSection')}>
          <div className={cx('paymentHighlightTitle')}>
            Select cryptocurrency
          </div>
          <div className={cx('paymentCryptocurrencySelectionEntries')}>
            <div className={cx('paymentCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'BTC')  ? 'paymentCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('BTC')}>
              <div>
                <img src="../img/bitcoin.png" />
              </div>
              <div>
                Bitcoin
              </div>
            </div>
            <div className={cx('paymentCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'ETH')  ? 'paymentCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('ETH')}>
              <div>
                <img src="../img/ether.png" />
              </div>
              <div>
                Ethereum
              </div>
            </div>
            <div className={cx('paymentCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'LTC')  ? 'paymentCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('LTC')}>
              <div>
                <img src="../img/litecoin.png" />
              </div>
              <div>
                Litecoin
              </div>
            </div>
            <div className={cx('clear')}></div>
          </div>
        </div>
        <div className={cx('paymentCryptocurrencySelectionSection')}>
          <div className={cx('')}>
            <div className={cx('paymentHighlightTitle')}>
              Price of
                {((this.props.selectedCryptocurrency == "BTC")  ? ' Bitcoin' : '')}
                {((this.props.selectedCryptocurrency == "ETH")  ? ' Ethereum' : '')}
                {((this.props.selectedCryptocurrency == "LTC")  ? ' Litecoin' : '')}
            </div>
            <div className={cx('num', 'paymentHighlight')}>
              $
                {priceDisplay}
            </div>
          </div>
        </div>
        <div className={cx('paymentCryptocurrencySelectionSection')}>
          <div className={cx('')}>
            <div className={cx('paymentHighlightTitle')}>
              Amount to pay:
            </div>
            <div>
              <span className={cx('num', 'paymentHighlight')}>
                {amountToPayDisplay}
              </span>
              <span>
                {this.props.selectedCryptocurrency}
              </span>
            </div>
          </div>
        </div>
        <div className={cx('paymentCryptocurrencySelectionSection')}>
          <div className={cx('paymentHighlightTitle')}>
            Total Payable Amount:
          </div>
          <div className={cx('num', 'paymentHighlight')}>
            <span className={cx('currency')}>{this.props.fiatCurrencySelected}</span> $
              {payableDisplay}
          </div>
        </div>
      </div>
    );
  }
}
