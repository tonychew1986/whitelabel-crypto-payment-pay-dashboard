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

import PaymentNavigation from '../components/PaymentNavigation';
import PaymentShippingIntro from '../components/PaymentShippingIntro';
import InvoiceForm from '../components/InvoiceForm';
import PaymentStepsButton from '../components/PaymentStepsButton';
import StepsIndicator from '../components/StepsIndicator';

////

class PageInvoiceAdd extends Component {

  constructor(props, context) {
    super(props, context);

      this.state = {
        merchantAccountId: "m1234567890",
        amount: 20,
        currency: "sgd",
        referenceCode: "abc",
        shopName: "invoice-test",
        testMode: true,
        signature: "",
        urlCallback: "http://www.dummyshop.io/ping/1",
        urlCancel: "http://www.dummyshop.io",
        urlComplete: "http://www.dummyshop.io/orders/1/done",
        name: "Tony",
        email: "tony@gmail.com",
        country: "singapore",
        address: "street 123",
        city: "singapore",
        state: "singapore",
        postalCode: "545323",
        mobile: "90809080",
        description: "dummy payment"
      }
  }

  componentDidMount(){
    this.props.appActions.checkInterfaceScheme();
  }

  _createInvoice = (e) => {
    e.preventDefault();

    this.props.appActions.createInvoiceWithoutRedirect(
      this.state.merchantAccountId,
      this.state.amount,
      this.state.currency,
      this.state.referenceCode,
      this.state.shopName,
      this.state.testMode,
      this.state.signature,
      this.state.urlCallback,
      this.state.urlCancel,
      this.state.urlComplete,
      this.state.name,
      this.state.email,
      this.state.country,
      this.state.address,
      this.state.city,
      this.state.state,
      this.state.postalCode,
      this.state.mobile,
      this.state.description
    );
  }

  _previousPage = () => {
    this.props.history.push("/review/"+this.props.app.merchantId+'/'+this.props.app.fiatCurrency+'/'+this.props.app.dollarValuePayAmount+'/'+this.props.app.productReference+'/'+this.props.match.params.shippingEnabled);
  }

  _nameChange = (e) => {
    this.setState({name: e.target.value});
  }

  _emailChange = (e) => {
    this.setState({email: e.target.value});
  }

  _countryChange = (e) => {
    this.setState({country: e.target.value});
  }

  _addressChange = (e) => {
    this.setState({address: e.target.value});
  }

  _postalCodeChange = (e) => {
    this.setState({postalCode: e.target.value});
  }

  _mobileChange = (e) => {
    this.setState({mobile: e.target.value});
  }

  _merchantAccountIdChange = (e) => {
    this.setState({merchantAccountId: e.target.value});
  }

  _amountChange = (e) => {
    this.setState({amount: e.target.value});
  }

  _currencyChange = (e) => {
    this.setState({currency: e.target.value});
  }

  _testModeChange = (e) => {
    this.setState({testMode: e.target.value});
  }

  _shopNameChange = (e) => {
    this.setState({shopName: e.target.value});
  }

  _referenceCodeChange = (e) => {
    this.setState({referenceCode: e.target.value});
  }

  _signatureChange = (e) => {
    this.setState({signature: e.target.value});
  }

  _urlCallbackChange = (e) => {
    this.setState({urlCallback: e.target.value});
  }

  _urlCancelChange = (e) => {
    this.setState({urlCancel: e.target.value});
  }

  _urlCompleteChange = (e) => {
    this.setState({urlComplete: e.target.value});
  }

  _descriptionChange = (e) => {
    this.setState({description: e.target.value});
  }
  // hide currency option unless needed
  render() {
    return (
      <div className={cx('page')}>
        <PaymentNavigation logo={this.props.app.logo} fiatCurrency={this.props.app.fiatCurrency} network={this.props.app.network} />
        <div className={cx('paymentWrapper')}>
          <div className={cx('paymentWrapperInner')}>
            <div>
              <div className={cx('paymentIntro')}>
                <div>
                  <div className={cx('paymentIntroTitle')}>
                    <strong>Invoice</strong>
                    <br />
                    form simulator
                  </div>
                  <div className={cx('paymentIntroDescription')}>
                    <p>
                      Please fill in all your shopping cart information
                    </p>
                    <p>
                      These information will be sent to our API and an invoice id will be returned (for redirection)
                    </p>
                  </div>
                </div>
              </div>

              <InvoiceForm merchantAccountId={this.state.merchantAccountId} amount={this.state.amount} currency={this.state.currency} referenceCode={this.state.referenceCode} shopName={this.state.shopName} testMode={this.state.testMode} name={this.state.name} email={this.state.email} country={this.state.country} city={this.state.city} state={this.state.state} description={this.state.description} signature={this.state.signature} urlCallback={this.state.urlCallback} urlCancel={this.state.urlCancel} urlComplete={this.state.urlComplete} address={this.state.address} postalCode={this.state.postalCode} mobile={this.state.mobile}  _amountChange={this._amountChange} _currencyChange={this._currencyChange} _nameChange={this._nameChange} _emailChange={this._emailChange} _countryChange={this._countryChange} _addressChange={this._addressChange} _postalCodeChange={this._postalCodeChange} _mobileChange={this._mobileChange} _merchantAccountIdChange={this._merchantAccountIdChange} _referenceCodeChange={this._referenceCodeChange} _shopNameChange={this._shopNameChange} _testModeChange={this._testModeChange} _signatureChange={this._signatureChange} _urlCallbackChange={this._urlCallbackChange} _urlCancelChange={this._urlCancelChange} _urlCompleteChange={this._urlCompleteChange} _descriptionChange={this._descriptionChange} _stateChange={this._stateChange} _cityChange={this._cityChange} _createInvoice={this._createInvoice} invoiceId={this.props.app.invoiceId} />
              <div className={cx('clear')}></div>
            </div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PageInvoiceAdd);
