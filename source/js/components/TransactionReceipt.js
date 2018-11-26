import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class TransactionReceipt extends React.Component {
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
    let blockexplorerLink;
    let addressDisplay;
    if(this.props.selectedCryptocurrency == "BTC"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = "mgALwtZqdmCpqwEnYKoHr39kAWpPhpPf1L";
        blockexplorerLink = "https://live.blockcypher.com/btc-testnet/address/"+addressDisplay;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://live.blockcypher.com/btc-testnet/address/"+addressDisplay;
      }else if(this.props.network == "production"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://live.blockcypher.com/btc/address/"+addressDisplay;
      }
    }else if(this.props.selectedCryptocurrency == "ETH"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = "0xaD74621d27e8c769Cc6AA6bD3f5Ee577BF92C750";
        blockexplorerLink = "https://ropsten.etherscan.io/address/"+addressDisplay;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://ropsten.etherscan.io/address/"+addressDisplay;
      }else if(this.props.network == "production"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://api.etherscan.io/address/"+addressDisplay;
      }
    }else if(this.props.selectedCryptocurrency == "LTC"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = "mpdTNiSCqyCvK84nJkrpopueGxomYMJXoD";
        blockexplorerLink = "https://chain.so/address/LTCTEST/"+addressDisplay;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://chain.so/address/LTCTEST/"+addressDisplay;
      }else if(this.props.network == "production"){
        addressDisplay = this.props.selectedCryptocurrencyAddress;
        blockexplorerLink = "https://chain.so/address/LTC/"+addressDisplay;
      }
    }

    return (
      <div>
        <div className={cx('paymentCompleted')}>
          <div className={cx('paymentCompletedTitle')}>
            Your payment was received on the blockchain.
          </div>
          <div className={cx('paymentCompletedDescription')}>
            <p>
              A confirmation email will be sent upon sufficient block confirmation.
            </p>
          </div>
        </div>
        <div className={cx('paymentReceipt')}>
          <div className={cx('')}>
            <div className={cx('paymentReceiptEntry')}>
              <div className={cx('paymentReceiptEntryTitle')}>
                Invoice Id
              </div>
              <div className={cx('paymentReceiptEntryTransactionNum','paymentReceiptEntryTransactionNumKey')}>
                {this.props.generatedTransactionId}
              </div>
            </div>
            <div className={cx('paymentReceiptEntry')}>
              <div className={cx('paymentReceiptEntryTitle')}>
                Blockchain Transaction Hash
              </div>
              <div className={cx('paymentReceiptEntryTransactionNum')}>
                <div className={cx('paymentReceiptEntryTransactionNumHash')}>
                  {(this.props.confirmationTransactionHash !== "") ? this.props.confirmationTransactionHash : "-"}
                </div>
                <div className={cx('paymentReceiptEntryTransactionNumLink')}>
                  <a href={blockexplorerLink} target="_blank">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADDSURBVEhL7ZUxDoJAEEXXjpLKwsqDSCeFnsbSI1B7GQ9g4630/2RJJmRmMsiYmMhLXhYC/L+bDVBWvsUeHg1buJgrfBke4GLkCnr4hKECLk8u13IHyQbeIIMfdXQLeHGcieUdNlCGc+zqcajgArWZUy2c5+OzoQLvJi2cpBRo4VzRFnLjhzqaeAVWOPfEnbXEKtDCiTchFe0BK5ykFJyhFk5SCsgJTsNJWoHF7xZ4b7KU931UMNdwQfRrOjXlJ/OXlPIGrsti4/IKUHEAAAAASUVORK5CYII=" />
                  </a>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
            <div className={cx('paymentReceiptEntry')}>
              <div className={cx('paymentReceiptEntryTitle')}>
                Product Reference Code
              </div>
              <div className={cx('paymentReceiptEntryTransactionNum')}>
                {this.props.productReference}
              </div>
            </div>
            <div className={cx('paymentReceiptEntry', 'hide')}>
              <div className={cx('paymentReceiptEntryDisclaimer')}>
                * Please note down the following transaction details to track your payment.
              </div>
            </div>
          </div>

          <div className={cx('clear')}></div>
        </div>
      </div>
    );
  }
}
