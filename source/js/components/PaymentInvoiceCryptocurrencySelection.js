import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';
import commaNumber from 'comma-number';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);


export default class PaymentInvoiceCryptocurrencySelection extends React.Component {
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
      <div className={cx('invoiceCryptocurrencySelection', ((this.props.paymentStatus)  ? 'disabled' : ''))}>
        <div className={cx('invoiceCryptocurrencySelectionSection')}>
          <div className={cx('paymentHighlightTitle')}>
            Select cryptocurrency
          </div>
          <div className={cx('invoiceCryptocurrencySelectionEntries')}>
            <div className={cx('invoiceCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'BTC')  ? 'invoiceCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('BTC')}>
              <div className={cx('invoiceCryptocurrencySelectionEntryIcon')}>
                <img src="../img/bitcoin.png" />
              </div>
              <div className={cx('invoiceCryptocurrencySelectionEntryText')}>
                Bitcoin
              </div>
              <div className={cx('clear')}></div>
            </div>
            <div className={cx('invoiceCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'ETH')  ? 'invoiceCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('ETH')}>
              <div className={cx('invoiceCryptocurrencySelectionEntryIcon')}>
                <img src="../img/ether.png" />
              </div>
              <div className={cx('invoiceCryptocurrencySelectionEntryText')}>
                Ethereum
              </div>
              <div className={cx('clear')}></div>
            </div>
            <div className={cx('invoiceCryptocurrencySelectionEntry', ((this.props.selectedCryptocurrency == 'LTC')  ? 'invoiceCryptocurrencySelectionEntrySelected' : ''))} onClick={() => this.props._selectCryptocurrency('LTC')}>
              <div className={cx('invoiceCryptocurrencySelectionEntryIcon')}>
                <img src="../img/litecoin.png" />
              </div>
              <div className={cx('invoiceCryptocurrencySelectionEntryText')}>
                Litecoin
              </div>
              <div className={cx('clear')}></div>
            </div>
            <div className={cx('clear')}></div>
          </div>
        </div>
      </div>
    );
  }
}
