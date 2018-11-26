import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as pageActions from '../actions/home';

import axios from 'axios';
import copy from 'copy-to-clipboard';
import moment from 'moment';

import classnames from 'classnames/bind';

import s from '../../css/App.styl';
const cx = classnames.bind(s);

import PaymentNavigation from '../components/PaymentNavigation';
import PaymentInvoiceCryptocurrencySelection from '../components/PaymentInvoiceCryptocurrencySelection';
import PaymentInvoiceTerminal from '../components/PaymentInvoiceTerminal';
import PaymentInvoiceCountdown from '../components/PaymentInvoiceCountdown';
import StepsInvoiceIndicator from '../components/StepsInvoiceIndicator';
import PaymentInvoiceFooter from '../components/PaymentInvoiceFooter';
import PaymentInvoiceHeader from '../components/PaymentInvoiceHeader';
import TransactionReceipt from '../components/TransactionReceipt';

////

class PageInvoice extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        paymentStatus: false,
        copiedStatus: false,
        page: 1
      }
  }

  componentDidMount(){
    if(!this.props.match.params.invoiceId){
      this.props.history.push("/invalid");
    }else{
      this.props.appActions.checkInterfaceScheme();
      this.props.appActions.checkInvoice(this.props.match.params.invoiceId);
    }
  }

  _redirectExpired = () => {
    // this.props.history.push('/expired');
    // this.props.appActions.cancelCheckBill();
    this.props.appActions.billExpire();
  }

  _selectCryptocurrency = (curr) => {
    this.props.appActions.selectCryptocurrency(curr);
  }

  _copyText = (add) => {
    this.setState({
      copiedStatus: true
    })
    copy(add);
  }

  _startPayment = () => {
    this.setState({
      paymentStatus: true
    })
  }

  _checkIfBillPaid = () => {
    this.props.appActions.checkBillPaid();
  }

  _cancelCheckBill = () => {
    this.props.appActions.checkBillCancel();
  }

  _redirectConfirmation = () => {
    this.setState({
      page: 3
    })
    this._cancelCheckBill();
  }

  _updateFiatCurrencySelected = (curr) => {
    this.props.appActions.updateFiatCurrencySelected(curr);
  }

  _nextPage = () => {
    if(this.state.page < 2){
      this.setState({
        page: this.state.page + 1
      })
      this._selectCryptocurrency(this.props.app.selectedCryptocurrency);
      this._checkIfBillPaid();
    }
  }

  _previousPage = () => {
    if(this.state.page > 1){
      this.setState({
        page: this.state.page - 1
      })
      this._cancelCheckBill();
    }
  }

  render() {
    let createdEpoch = moment(this.props.app.invoiceData.createdAt).valueOf();
    let currentEpoch = moment().valueOf();
    let epochDifference = (createdEpoch + 900000) - currentEpoch;

    ///////////////////////////////////////////
    // invoice still showing even after being paid
    ///////////////////////////////////////////
    if(this.props.app.invoiceValid == false){
      return (
        <div className={cx('page')}>
          <PaymentNavigation logo={this.props.app.logo} fiatCurrency={this.props.app.fiatCurrency} network={this.props.app.network} currencyShow="yes" _updateFiatCurrencySelected={this._updateFiatCurrencySelected} />
          <div className={cx('paymentWrapper','paymentWrapperMobile')}>
            <div className={cx('paymentWrapperInner')}>
              <div className={cx('invoiceExpired')}>
                <div className={cx('invoiceExpiredTitle')}>
                  Invoice is invalid
                </div>
                <div className={cx('invoiceExpiredLink', 'hide')}>
                  There may not be enough block confirmation
                </div>
              </div>
            </div>
          </div>
          <PaymentInvoiceFooter createdAt={this.props.app.invoiceData.createdAt} urlCancel={this.props.app.invoiceData.urlCancel} epochDifference={epochDifference} />
        </div>
      )
    }else if(this.props.app.invoiceData.status == "detected"){
      return (
        <div className={cx('page')}>
          <PaymentNavigation logo={this.props.app.logo} fiatCurrency={this.props.app.fiatCurrency} network={this.props.app.network} currencyShow="yes" _updateFiatCurrencySelected={this._updateFiatCurrencySelected} />
          <div className={cx('paymentWrapper','paymentWrapperMobile')}>
            <div className={cx('paymentWrapperInner')}>
              <PaymentInvoiceHeader merchantId={this.props.app.invoiceData.merchantId} merchantName={this.props.app.invoiceData.merchantName} amount={this.props.app.invoiceData.amount} description={this.props.app.invoiceData.description} fiatCurrency={this.props.app.invoiceData.currency} fiatCurrencySelected={this.props.app.fiatCurrencySelected} paymentStatus={this.state.paymentStatus} selectedCryptocurrency={this.props.app.selectedCryptocurrency} USDSGD={this.props.app.invoiceData.USDSGD} priceBTC={this.props.app.invoiceData.priceBTC} priceETH={this.props.app.invoiceData.priceETH} priceLTC={this.props.app.invoiceData.priceLTC} amountBTC={this.props.app.invoiceData.amountBTC} amountETH={this.props.app.invoiceData.amountETH} amountLTC={this.props.app.invoiceData.amountLTC} paymentExpired={true} />
              <div className={cx('invoiceExpired')}>
                <div className={cx('invoiceExpiredTitle')}>
                  Invoice is paid
                </div>
                <div className={cx('invoiceExpiredLink', 'hide')}>
                  There may not be enough block confirmation
                </div>
              </div>
            </div>
          </div>
          <PaymentInvoiceFooter createdAt={this.props.app.invoiceData.createdAt} urlCancel={this.props.app.invoiceData.urlCancel} epochDifference={epochDifference} />
        </div>
      )
    }else if(epochDifference <= 0 || this.props.app.paymentExpired == true || this.props.app.invoiceData.status == "expired"){
      return (
        <div className={cx('page')}>
          <PaymentNavigation logo={this.props.app.logo} fiatCurrency={this.props.app.fiatCurrency} network={this.props.app.network} currencyShow="yes" _updateFiatCurrencySelected={this._updateFiatCurrencySelected} />
          <div className={cx('paymentWrapper','paymentWrapperMobile')}>
            <div className={cx('paymentWrapperInner')}>
              <PaymentInvoiceHeader merchantId={this.props.app.invoiceData.merchantId} merchantName={this.props.app.invoiceData.merchantName} amount={this.props.app.invoiceData.amount} description={this.props.app.invoiceData.description} fiatCurrency={this.props.app.invoiceData.currency} fiatCurrencySelected={this.props.app.fiatCurrencySelected} paymentStatus={this.state.paymentStatus} selectedCryptocurrency={this.props.app.selectedCryptocurrency} USDSGD={this.props.app.invoiceData.USDSGD} priceBTC={this.props.app.invoiceData.priceBTC} priceETH={this.props.app.invoiceData.priceETH} priceLTC={this.props.app.invoiceData.priceLTC} amountBTC={this.props.app.invoiceData.amountBTC} amountETH={this.props.app.invoiceData.amountETH} amountLTC={this.props.app.invoiceData.amountLTC} paymentExpired={true} />
              <div className={cx('invoiceExpired')}>
                <div className={cx('invoiceExpiredTitle')}>
                  This order has expired
                </div>
                <div className={cx('invoiceExpiredLink')}>
                  Learn more about refunds
                </div>
              </div>
            </div>
          </div>
          <PaymentInvoiceFooter createdAt={this.props.app.invoiceData.createdAt} urlCancel={this.props.app.invoiceData.urlCancel} epochDifference={epochDifference} />
        </div>
      )
    }else{

      return (
        <div className={cx('page')}>
          <PaymentNavigation logo={this.props.app.logo} fiatCurrency={this.props.app.fiatCurrency} network={this.props.app.network} currencyShow="yes" _updateFiatCurrencySelected={this._updateFiatCurrencySelected} />
          <div className={cx('paymentWrapper','paymentWrapperMobile')}>
            <StepsInvoiceIndicator currentStep={this.state.page - 1} shippingEnabled={this.props.match.params.shippingEnabled} />
            <div className={cx('paymentWrapperInner')}>
              <PaymentInvoiceHeader merchantId={this.props.app.invoiceData.merchantId} merchantName={this.props.app.invoiceData.merchantName} amount={this.props.app.invoiceData.amount} description={this.props.app.invoiceData.description} fiatCurrency={this.props.app.invoiceData.currency} fiatCurrencySelected={this.props.app.invoiceData.currency} paymentStatus={this.state.paymentStatus} selectedCryptocurrency={this.props.app.selectedCryptocurrency} USDSGD={this.props.app.invoiceData.USDSGD} priceBTC={this.props.app.invoiceData.priceBTC} priceETH={this.props.app.invoiceData.priceETH} priceLTC={this.props.app.invoiceData.priceLTC} amountBTC={this.props.app.invoiceData.amountBTC} amountETH={this.props.app.invoiceData.amountETH} amountLTC={this.props.app.invoiceData.amountLTC} paymentExpired={this.props.app.paymentExpired} />

              <div className={cx('paymentWrapperInnerContent')}>
                <div className={((this.state.page == 1) ? "" : "hide")}>
                  <PaymentInvoiceCryptocurrencySelection fiatCurrency={this.props.app.invoiceData.currency} fiatCurrencySelected={this.props.app.invoiceData.currency} paymentStatus={this.state.paymentStatus} selectedCryptocurrency={this.props.app.selectedCryptocurrency} USDSGD={this.props.app.invoiceData.USDSGD} priceBTC={this.props.app.invoiceData.priceBTC} priceETH={this.props.app.invoiceData.priceETH} priceLTC={this.props.app.invoiceData.priceLTC}  dollarValuePayAmount={this.props.app.invoiceData.amount} _selectCryptocurrency={this._selectCryptocurrency} />
                </div>

                <div className={((this.state.page == 2) ? "" : "hide")}>
                  <PaymentInvoiceTerminal epochDifference={epochDifference} network={this.props.app.network} fiatCurrency={this.props.app.invoiceData.currency} fiatCurrencySelected={this.props.app.invoiceData.currency} loadingPrices={this.props.app.loadingPrices} copiedStatus={this.state.copiedStatus} paymentStatus={this.state.paymentStatus} addressTestnetBTC={this.props.app.addressTestnetBTC} addressTestnetETH={this.props.app.addressTestnetETH} addressTestnetLTC={this.props.app.addressTestnetLTC} addressBTC={this.props.app.addressBTC} addressETH={this.props.app.addressETH} addressLTC={this.props.app.addressLTC} selectedCryptocurrencyAddress={this.props.app.selectedCryptocurrencyAddress} selectedCryptocurrency={this.props.app.selectedCryptocurrency} USDSGD={this.props.app.invoiceData.USDSGD} priceBTC={this.props.app.invoiceData.priceBTC} priceETH={this.props.app.invoiceData.priceETH} priceLTC={this.props.app.invoiceData.priceLTC} amountBTC={this.props.app.invoiceData.amountBTC} amountETH={this.props.app.invoiceData.amountETH} amountLTC={this.props.app.invoiceData.amountLTC} dollarValuePayAmount={this.props.app.invoiceData.amount} paymentDetected={this.props.app.paymentDetected} paymentCompleted={this.props.app.paymentCompleted} _previousPage={this._previousPage} _startPayment={this._startPayment} _copyText={this._copyText} transactionId={this.props.app.generatedTransactionId} _redirectConfirmation={this._redirectConfirmation} _redirectExpired={this._redirectExpired} />

                </div>

                <div className={((this.state.page == 3) ? "" : "hide")}>
                  <TransactionReceipt selectedCryptocurrency={this.props.app.selectedCryptocurrency} generatedTransactionId={this.props.app.invoiceData.invoiceId} productReference={this.props.app.invoiceData.productReference} selectedCryptocurrencyAddress={this.props.app.selectedCryptocurrencyAddress} network={this.props.app.network} confirmationTransactionHash={this.props.app.confirmationTransactionHash} />
                </div>

                <div className={cx('clear')}></div>
              </div>
              <div className={cx('paymentWrapperInnerButtons')}>
                <div className={cx('invoiceStepsButtonPrevious')}>
                  <div className={cx('invoiceStepsButton', ((this.state.page == 2 && this.props.app.paymentDetected == false) ? "" : "hide"))} onClick={() => this._previousPage()}>
                    <button>
                      Previous
                    </button>
                  </div>
                </div>
                <div className={cx('invoiceStepsButtonNext')}>
                  <div className={cx('invoiceStepsButton', ((this.state.page == 1) ? "" : "hide"))} onClick={() => this._nextPage()}>
                    <button>
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className={cx('clear')}></div>
            </div>
          </div>
          <PaymentInvoiceFooter createdAt={this.props.app.invoiceData.createdAt} urlCancel={this.props.app.invoiceData.urlCancel} epochDifference={epochDifference} />
        </div>
      )

    }

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
export default connect(mapStateToProps, mapDispatchToProps)(PageInvoice);
