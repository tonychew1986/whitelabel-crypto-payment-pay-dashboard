import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import moment from 'moment';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentStepsButton extends React.Component {
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
      <div className={cx('paymentSteps')}>
        <div className={cx('paymentStepPrevious', ((this.props.previousText == "")  ? 'hide' : ''))}>
          <button className={cx('negative')} onClick={() => this.props._previousPage()}>
            <span>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB6SURBVEhL7ZZBCoAwDAQrnvyIPsnXCerTBL/RuIXkUgRPmyLNwBLoHubUkBQEX4jImHPekFWf+Kj0wBTMC5m04lFJb2TWikdIqaj0bC1dtOLRlXRAdldpoZm4AGf9fULO50XOXyBGyPuUI7ZkfE4fo8gh9D32gh+Q0gO4X3NmjeVTEgAAAABJRU5ErkJggg==" />
            </span>
            <span>
              {this.props.previousText}
            </span>
          </button>
        </div>
        <div className={cx('paymentStepNext', ((this.props.nextText == "")  ? 'hide' : ''))}>
          <button name="next" onClick={(e) => this.props._nextPage(e)}>
            <span>
              {this.props.nextText}
            </span>
            <span>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABrSURBVEhL7ZZBCoBACEWNVp2kI3W6qK4WdA3tC7OIYbYqwX/wEcbFQxeDQsgXVd2Q3czm9hQPhAtyQ+qcSKp8RR43o16Up0A55WVy4J/M1FqxdFMfKeLBtPGrpjQUSkOpkpaePvnHHvkpIi8COXN6wb2QSwAAAABJRU5ErkJggg==" />
            </span>
          </button>
        </div>
        <div className={cx('clear')}></div>
      </div>
    );
  }
}
