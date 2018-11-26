import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';
import Select from 'react-select';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentNavigation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedOption: {
        value: 'sgd', label: 'SGD - Singapore Dollar'
      }
    }
  }
  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.fiatCurrencySelected == "sgd"){
      this.setState({
        selectedOption: {
          value: 'sgd', label: 'SGD - Singapore Dollar'
        }
      })
    }else if(nextProps.fiatCurrencySelected == "usd"){
      this.setState({
        selectedOption: {
          value: 'usd', label: 'USD - United States Dollar'
        }
      })
    }
  }

  _sampleFunction = () => {

  }

  _handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props._updateFiatCurrencySelected(selectedOption.value);
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    let logoImg = "../img/aropay.png";

    if(this.props.logo == "" || this.props.logo == undefined){
      logoImg = "../img/aropay.png";
    }else{
      logoImg = "../img/"+this.props.logo;
    }

    return (
      <div className={cx('paymentNavigation')}>
        <div className={cx('paymentNavigationLogo')}>
          <div className={cx('paymentNavigationLogoImage')}>
            <img src={logoImg} />
          </div>
          <div className={cx('paymentNavigationNetwork')}>
            <div className={cx('paymentNavigationNetworkTitle')}>
              Network:
            </div>
            <div>
              {(this.props.network == "" || this.props.network == undefined) ? "development" : ""}
              {(this.props.network == "staging") ? "staging" : ""}
              {(this.props.network == "production") ? "production" : ""}
            </div>
          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('paymentNavigationActions','hide')}>
          <div className={cx('paymentNavigationActionsMenu')} onClick={() => this.props._menuToggle()}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA4SURBVFhH7dOxCQAADAJB9186WUCwMZDiD760VAA+muMiN2oGIHLXaRa5UTMAkbtOs8iNmgH4RFrzpY9xuWJl5QAAAABJRU5ErkJggg==" />
          </div>
          <div className={cx('paymentNavigationActionsDesktop')}>
            <div className={cx('paymentNavigationActionsCurrency', ((this.props.currencyShow == "yes") ? '' : 'hide'))}>
              <div className={cx('paymentNavigationActionsCurrencyTitle')}>
                Currency:
              </div>
              <div className={cx('paymentNavigationActionsCurrencySelect')}>
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption}
  	              disabled={false}
  	              clearable={false}
  	              searchable={false}
                  onChange={this._handleChange}
                  options={[
                    { value: 'sgd', label: 'SGD - Singapore Dollar' },
                    { value: 'usd', label: 'USD - United States Dollar' },
                  ]}
                />
              </div>
            </div>
            <div className={cx('paymentNavigationActionsAccess')}>
              <button>
                Login
              </button>

            </div>
          </div>
          <div className={cx('clear')}></div>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
