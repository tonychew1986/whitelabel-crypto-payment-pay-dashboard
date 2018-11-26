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

export default class StepsInvoiceIndicator extends React.Component {
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
    return (
      <div className={cx('stepsIndicator')}>
        <Steps labelPlacement="vertical" current={this.props.currentStep}>
          <Step title="Selection" status={((this.props.currentStep == 0)  ? 'process' : '')} />
          <Step title="Payment" status={((this.props.currentStep == 1)  ? 'process' : '')} />
          <Step title="Receipt" status={((this.props.currentStep == 2)  ? 'process' : '')} />
        </Steps>
      </div>
    );
  }
}
