import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';
import QRCode from 'qrcode.react';
import commaNumber from 'comma-number';
import truncateMiddle from 'truncate-middle';
import Countdown from 'react-countdown-now';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentInvoiceTerminal extends React.Component {
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
    let QRCodeDisplay;
    let addressDisplay;

    if(this.props.selectedCryptocurrency == "BTC"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = this.props.addressTestnetBTC;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.addressBTC;
      }

      QRCodeDisplay = (
        <div>
          <QRCode value={"bitcoin:"+ addressDisplay +"?amount="+this.props.amountBTC} size="160" />
        </div>
      )
    }else if(this.props.selectedCryptocurrency == "ETH"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = this.props.addressTestnetETH;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.addressETH;
      }

      QRCodeDisplay = (
        <div>
          <QRCode value={"ethereum:"+ addressDisplay +"?amount="+ this.props.amountETH} size="160" />
        </div>
      )
    }else if(this.props.selectedCryptocurrency == "LTC"){
      if(this.props.network == "" || this.props.network == undefined){
        addressDisplay = this.props.addressTestnetLTC;
      }else if(this.props.network == "staging"){
        addressDisplay = this.props.addressLTC;
      }

      QRCodeDisplay = (
        <div>
          <QRCode value={"litecoin:"+ addressDisplay +"?amount="+this.props.amountLTC} size="160" />
        </div>
      )
    }

    let terminalDisplay;
    if(this.props.paymentCompleted == false){
      terminalDisplay = (
        <div className={cx('invoiceTerminalPay')}>
          <div className={cx('invoiceTerminalFields')}>
            <div className={cx('invoiceTerminalCountdown')}>
              <div className={cx('paymentHighlightTitle')}>
                Payment Countdown
              </div>
              <div className={cx('num', 'paymentHighlight')}>
                <Countdown
                  date={Date.now() + this.props.epochDifference}
                  renderer={props => <span>{props.minutes}:{props.seconds}</span>}
                  onComplete={this.props._redirectExpired}
                />
              </div>
            </div>
            <div className={cx('invoiceTerminalField')}>
              <div className={cx('invoiceTerminalFieldQR')}>
                {QRCodeDisplay}
              </div>
            </div>
            <div className={cx('invoiceTerminalField')}>
              <div className={cx('invoiceTerminalFieldAddress')}>
                <div className={cx('invoiceTerminalFieldAddressDisplay')}>
                  {addressDisplay}
                </div>
                <div className={cx('invoiceTerminalFieldAddressDisplayMobile')}>
                  {truncateMiddle(addressDisplay, 8, 8, '.....')}
                </div>
                <div className={cx('invoiceTerminalFieldAddressCopy')} onClick={() => this.props._copyText(addressDisplay)}>
                  <div className={cx('invoiceTerminalFieldAddressCopyIcon')}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACYSURBVFhH7Y5BCoBADMT2/59WPBSWsTBpV/DSQEEwE3YNQ8J1eMdk0cod0w39/oDPcA+I/92zOHGPdc7iRBwS8M6JOCTgnRNxSMA7J+KQgHdOxCEB75yIQwLeORGHBLxzIg4JeOdEHBLwzok4JOCdE3FIwDsn4pCAdyFm97B/V8C7ELN72L8rdHcv5gER6t4xWbRyw7Cx1g2bhM8xsb4cFQAAAABJRU5ErkJggg==" />
                  </div>
                  <div className={cx('invoiceTerminalFieldAddressCopyText')}>
                    {((this.props.copiedStatus)  ? 'Copied! ' : 'Copy Address')}
                  </div>
                  <div className={cx('clear')}></div>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
            <div className={cx((this.props.paymentDetected == true)? "" : "hide")}>
              Payment detected. Waiting for additional confirmation
            </div>
          </div>
        </div>
      )
    }else{
      terminalDisplay = (
        <div className={cx('invoiceTerminalSuccess')}>
          <div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIDSURBVHhe7ZjrKkRhFIbnElwKF4AkxyQ5JUkOSZKQhCSSJORW/XE+v+80X612+5vZe82esVeznnqaBu9uPx+aaSqO4ziO4ziO4ziOY4qe2mNeumuPplmD3/C8+iw7D/ATzlafGSXE/9bMegj3MGzMHkIynvJ5o3+HOyg39BF2QTPE4vn1etxCuaFPsBeaQRt/A+WGPsM+aAZt/DWUG9ox8VdQbijj+6EZtPGXUG4o4wegGYqOH4Rm0MZfQLmhjB+CZtDG882Q3NCOiT+DckNf4DA0gzb+FMoNfYUj0Aza+BMoN/QNjkIzaOOPodzQdzgGzaCNP4JyQzsm/hDKDWX8OCwE7acseXba+AMoN5TxE7AQ+Fqa5UaS5Nlp4/eh3FDGT8JCkG8k8hxCnp02fg/KDWX8FCwE/vlqbizPrpn4Hyh3hcYHtDeYZae99i5Mi5+GLUF7o/V22mvuwGT8B5yBLUV7w7Gd5lrbMBnf1k9xizwEaZZrbMG0+DnYVoo+hCzbTZiM/4Jtjw9oDkF7ALH4efiv5DmEWHwwttuAafELsBRkOYTYzzTarcO0+EVYKuodQjPfS4tfgqUkFhMLDGTdlTo+kBYjTcYHGu0YvwxNEIuJxQdiO8avQFMkYxrFB9J2q9AkvHH+9mieCO2ulPC1WvN6rd05juM4juM4juM4zVOp/AElPP3URYaWpQAAAABJRU5ErkJggg==" />
          </div>
          <div className={cx('paymentHighlightTitle')}>
            Payment received
          </div>
          <div className={cx('countdownTimerEntry')}>
            <div>
              We will be redirecting you in
              <Countdown
                date={Date.now() + 10000}
                renderer={props => <span> {" "+props.seconds+" "} </span>}
                onComplete={this.props._redirectConfirmation}
              />
             seconds
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={cx('invoiceTerminal')}>
        {terminalDisplay}
        <div>
          <input type="hidden" name="transactionId" value={this.props.transactionId} />
        </div>
      </div>
    );
  }
}
