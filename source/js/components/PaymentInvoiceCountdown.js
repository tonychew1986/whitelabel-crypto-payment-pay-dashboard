import React from 'react';

import { BrowserRouter, HashRouter, Route, Router, Switch, Link } from 'react-router-dom'

import classnames from 'classnames/bind';

import Countdown from 'react-countdown-now';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';

// Using CSS Modules so we assign the styles to a variable
import s from '../../css/App.styl';
const cx = classnames.bind(s);

export default class PaymentInvoiceCountdown extends React.Component {
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
    let countdownTimerDisplay;
    let countdownTimerPaidDisplay;

    let createdEpoch = moment(this.props.createdAt).valueOf();
    let currentEpoch = moment().valueOf();
    let epochDifference = (createdEpoch + 1200000) - currentEpoch;

    if(this.props.paymentCompleted){
      countdownTimerPaidDisplay = (
        <div className={cx('countdownTimerPost')}>
          <div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR/SURBVHhe7ZtXjxxFFIWXtBhjkk0wOWMb+BX8MUs8IoQRQgghghACBDZCgLAxAgwmiowwOZkc3uFxl+92VT3sqmq6urtqenb6fNLV7el7z+2qU6PZHWl3RQghhBBCCCGEEEIIIYQQQgghhBBibqyvr6/6y2Ksra2d6S/FLDB/B2a9Sez3twbDrFuJk8Rt/paIEcwnN5Q4BGbcQvzj5/1L6BBi4M8G8wPc630IaG8m/vajGnitQ9gMvkTND1DrfAho9hF/+REb4L4OIYAfM803fD37BzO9e9H82YgTUL/dt08XfMg1f4eXtEKvmf9HI05A/Q7fPl3wobj59O/JMP9O3z5d8KGG+TcRvzt1HJkP+FDD/BuJ35w6DvW7fPt0wYca5t9A/OrUcagf8O3TBR9qmH99hvl3k07xkmmCAbXM/8Wp41C/hyTzS5tP73UyPwMMqPHOv5b42anjUL+XJPNLm0/vNWhONuIE1O8jyfzS5tN/NfGTU8ehfj9J5pc2n96r0PzYiBNQf4Ak8yuZ/0MjTiDzAQNqfOxcmWH+gySZX8H8K4jvnToO9YdIMr+S+d85dRzqD5NO9ZJpggE1zL+c+Nap41B/hHSal0wTDKhh/mXEN04dR+YDBtQy/2unjkP9UZLMr2D+pRnmP0aS+aXNp3c3mq8acQLqj5PmZz4PK/6neUNnoq/xzr+E+NKp41B/gjQ/83ng/q4baWPoTNN5fZKu8+m/mPjCqeNQf5I0X/Pdo7tvKMXQmdbvdUm6zqX/IuKEU8eh/hRpHPMDXTe2maEzrc/3J+m6RvpbzYeniXHND3TdYGDoTKv7viRd10a/mf+5U8ehfpB0upfUh4etlt4ovYNm2v3Sa6LfzP/MqeNQP0Q6w0vmBw8tvmHr7TPTXldYy4VoPm3ECaiPY36Ah49+CJZLr4H+XcQnTh2H+jOk4r96d4ZFjHkI9oWo6LPp30l87NRxqD9LGt/8AIsZ6xD+85dRuj6TfjP/I6eOQ/050uKYH2BRoxxCih7PugBNm/nPkxbP/ACLW4hD6PGM84kPTZuCmS+QFtf8AIsc9RB6zD4PzQeNOAH1F0mLb36AxdY4BPuB2/aZb/XdXtIKvWb++404AfXDpK1jfoBFFzsE62mbFegw08x/rxEloH6E2Lr/LM0eBh+C1dpmbCZjppn/btOcgPoR0jYv2bqwid6HYPfatClmzDTz32maElB/ibT1zQ+wmc6HYNcZmk7fA3h9LvG2q8ahfpQ4y0uWB/aWfQgWmb3Z34TJ5xBvubtxqL9M2u6XvHywuSxjc3pIzTvbcqGZr5CW1/wAm2w1bBZeu+Gz3V4PnPkqafnND7DZXobFzA/Y/Z4zXyNNx/wAm+5k2CzzA1bveAivE9MzP8DmswzLMT9gfZkz3yBN1/wAJsw0rIv5AetvmXmcONu3CzyJGtbH/IDpEjOPk3rNXGrMFMw51rgE/nqQUaYvPXOpwZztmHTYwq797UHUmLnUYNKqhX9ZhBozhRBCCCGEEEIIIYQQQgghhBBiKVlZ+R/m0ov5r7xh9AAAAABJRU5ErkJggg==" />
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

    if(this.props.paymentStatus){
      countdownTimerDisplay = (
        <div className={cx('countdownTimer')}>
          {countdownTimerPaidDisplay}
          <div className={cx('countdownTimerEntry')}>
            <div className={cx('countdownTimerEntryCheck', ((this.props.selectedCryptocurrency == "ETH") ? "" : "hide"))}>
              <div className={cx('countdownTimerEntryCheckExplorers')}>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationEtherscanETH) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    Etherscan
                  </div>
                </div>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationEthplorerETH) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    Ethplorer
                  </div>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
            <div className={cx('countdownTimerEntryCheck', ((this.props.selectedCryptocurrency == "BTC") ? "" : "hide"))}>
              <div className={cx('countdownTimerEntryCheckExplorers')}>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationBlocktrailBTC) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    BlockTrail
                  </div>
                </div>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationSochainBTC) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    SoChain
                  </div>
                </div>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationBlockcypherBTC) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    BlockCypher
                  </div>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
            <div className={cx('countdownTimerEntryCheck', ((this.props.selectedCryptocurrency == "LTC") ? "" : "hide"))}>
              <div className={cx('countdownTimerEntryCheckExplorers')}>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationSochainLTC) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    SoChain
                  </div>
                </div>
                <div className={cx('countdownTimerEntryCheckExplorer')}>
                  <div className={cx('countdownTimerEntryCheckExplorerSelector')}>
                    {(this.props.paymentConfirmationBlockcypherLTC) ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=' /> : ""}
                  </div>
                  <div className={cx('countdownTimerEntryCheckExplorerTitle')}>
                    BlockCypher
                  </div>
                </div>
                <div className={cx('clear')}></div>
              </div>
            </div>
          </div>
        </div>
      )
    }else if(this.props.paymentStatus == "completed"){
      countdownTimerDisplay = (
        <div className={cx('countdownLoader')}>
          <div className={cx('countdownLoaderIcon')}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=" />
          </div>
          <div className={cx('countdownLoaderText')}>
            Payment Received...
          </div>
        </div>
      )
    }else if(this.props.paymentStatus == "closed"){
      countdownTimerDisplay = (
        <div className={cx('countdownLoader')}>
          <div className={cx('countdownLoaderIcon')}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHgSURBVHhe7dpBTsMwEEDRrrpAvXNvxZYF92qZD7YEUhXS1vakzn9SREibxPO9YMNBkiRJkiRJkiRJkta7Xq/HcqrRIv7pcrl8xnEulzRKjR8/v7kJA0XvP/ErN2GA6HwzfuUmdBR9F+OjfO4f5tYi6tr4p3KLWiGq8ZMQ1fhJiGr8JEQ1fhKiGj8JUY2fhKjGT0JU4ychqvGTENX4SYhq/CRENX4Soho/CVGNn4Soxk9CVOMnIarxkxDV+EmIavwkRDV+EqIaPwlRjZ+EqFPFj4W+zD8YEXWq+LHY86ssmDVOF/9n2dtfOGubNn611QFY0/Txq60Nwlqmih8LPb7KQKxhqvgVC976YLx7yvgVC9/qgLxz6vgVA2xtUN61i/gVg2xlYN6xq/gVA2UPzrN3Gb9isKwAPHPX8SsGHB2CZxn/FwYdFYRnGP8GBu4dhnuNv4DBewXiHuOvQIDWofiu8e9AiFbB+I7xH0CQZ8PxmfGfQJhHA3LN+A0Q6N6QnBu/IUKtDcph/A4Itias8Tsi3H+Blxi/AQI+sgnGb4iQ92yC8Tsg6JpNMH5HhF3aBOMPQOBbm2D8gQgdwT++y4dybvyRIvhbhH/n4Lxc1kgR/shRfpUkSZIkSZIkSZrM4fAF6QuydYeJBCwAAAAASUVORK5CYII=" />
          </div>
          <div className={cx('countdownLoaderText')}>
            Payment closed.
          </div>
        </div>
      )
    }else{
      countdownTimerDisplay = (
        <div>
          {countdownTimerPaidDisplay}
        </div>
      )
    }

    return (
      <div className={cx('paymentCountdown')}>
        {countdownTimerDisplay}
      </div>
    );
  }
}
