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

import PaymentIntro from '../components/PaymentIntro';

////

class PageTransactionCheck extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        id: ""
      }
  }

  componentDidMount(){
  }

  _clearCheckedInvoice = () => {
    this.props.appActions.clearCheckedInvoice();
  }

  _checkTransaction = (e) => {
    e.preventDefault();

    this.props.appActions.checkTransaction(this.state.id);
  }

  _idChange = (e) => {
    this.setState({id: e.target.value});
  }

  render() {
    let logoImg = "../img/logo.png";

    if(this.props.app.logo == "" || this.props.app.logo == undefined){
      logoImg = "../img/logo.png";
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
          </div>
          <div className={cx('indexInvoiceCheck', ((this.props.app.invoiceFound == true) ? "hide" : ""))}>
            <div className={cx('indexInvoiceCheckTitle')}>
              Check your invoice status
            </div>
            <form onSubmit={(e) => this._checkTransaction(e)}>
              <div>
                Search by invoice id:
              </div>
              <div>
                <input type="text" name="id" value={this.state.id} onChange={this._idChange} required />
              </div>
              <div>
                <button>
                  Check invoice
                </button>
              </div>
            </form>
          </div>
          <div className={cx('indexInvoiceResult', ((this.props.app.invoiceFound == false) ? "hide" : ""))}>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Invoice Id:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.invoiceId}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Merchant Id:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.merchantId}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Merchant Name:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.merchantName}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Invoice Amount:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.amount} {this.props.app.transactionData.currency}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Blockchain Transaction Hash:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.blockchainHash}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Cryptocurrency Paid:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                <span>
                  {(this.props.app.transactionData.paidCryptocurrency == "BTC") ? this.props.app.transactionData.amountBTC : ""}
                  {(this.props.app.transactionData.paidCryptocurrency == "ETH") ? this.props.app.transactionData.amountETH : ""}
                  {(this.props.app.transactionData.paidCryptocurrency == "LTC") ? this.props.app.transactionData.amountLTC : ""}
                </span>
                <span>
                  {this.props.app.transactionData.paidCryptocurrency}
                </span>
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Invoice Status:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.status}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Product Reference Code:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.productReference}
              </div>
            </div>
            <div className={cx('indexInvoiceResultEntry')}>
              <div className={cx('indexInvoiceResultTitle')}>
                Date of Invoice:
              </div>
              <div className={cx('indexInvoiceResultAnswer')}>
                {this.props.app.transactionData.createdAt}
              </div>
            </div>
            <div onClick={() => this._clearCheckedInvoice()}>
              <button>
                Back
              </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(PageTransactionCheck);
