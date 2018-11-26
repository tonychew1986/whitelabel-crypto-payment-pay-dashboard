import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';
import Steps, { Step } from 'rc-steps';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

const descriptionReview = 'Check your payment summary';
const descriptionInfo = 'Enter your shipping particulars';
const descriptionPayment = 'Make your crypto payment';
const descriptionConfirmation = 'Payment receipt';

export default class StepsIndicator extends React.Component {
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
    if(this.props.shippingEnabled == 1){
      return (
        <div className={cx('stepsIndicator')}>
          <Steps current={this.props.currentStep}>
            <Step title="Payment review" status={((this.props.currentStep == 0)  ? 'process' : '')} />
            <Step title="Shipping information" status={((this.props.currentStep == 1)  ? 'process' : '')} />
            <Step title="Make payment" status={((this.props.currentStep == 2)  ? 'process' : '')} />
            <Step title="Payment confirmation" status={((this.props.currentStep == 3)  ? 'process' : '')} />
          </Steps>
        </div>
      );
    }else{
      return (
        <div className={cx('stepsIndicator')}>
          <Steps current={this.props.currentStep}>
            <Step title="Payment review" status={((this.props.currentStep == 0)  ? 'process' : '')} />
            <Step title="Make payment" status={((this.props.currentStep == 2)  ? 'process' : '')} />
            <Step title="Payment confirmation" status={((this.props.currentStep == 3)  ? 'process' : '')} />
          </Steps>
        </div>
      );
    }
  }
}
