import axios from "axios";
import { push } from 'react-router-redux'

import bitcoin from 'bitcoinjs-lib'
import Bip32Utils from 'bip32-utils';

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

var checkBillIntervalEtherscanETH;
var checkBillIntervalEthplorerETH;
var checkBillIntervalCypherblockETH;

var checkBillIntervalBlocktrailBTC;
var checkBillIntervalSochainBTC;
var checkBillIntervalBlockcypherBTC;

var checkBillIntervalSochainLTC;
var checkBillIntervalBlockcypherLTC;

var checkBillTimestamp;

var urlEtherscanETH = "/blockexplorer/checkBillETH/etherscan";
var urlEthplorerETH = "/blockexplorer/checkBillETH/ethplorer";
var urlBlockcypherETH = "/blockexplorer/checkBillETH/blockcypher";

var urlBlocktrailBTC = "/blockexplorer/checkBillBTC/blocktrail";
var urlSochainBTC = "/blockexplorer/checkBillBTC/sochain";
var urlBlockcypherBTC = "/blockexplorer/checkBillBTC/blockcypher";

var urlSochainLTC = "/blockexplorer/checkBillLTC/sochain";
var urlBlockcypherLTC = "/blockexplorer/checkBillLTC/blockcypher";

var checkBillIntervalRate = 15000;



///////////////////////////////////////
// this has some conflict with mobile app
//////////////////////////////////////
export const settleAllBillsBTC = () => {
  return function (dispatch, getState) {
    dispatch(checkBillCancel());

    dispatch({
      type: "SETTLE_ALL_BILLS_BTC"
    })

    dispatch(updateInvoice());
    dispatch(sendInstructionsToExchange());
  }
}

export const settleAllBillsETH = () => {
  return function (dispatch, getState) {
    dispatch(checkBillCancel());

    dispatch({
      type: "SETTLE_ALL_BILLS_ETH"
    })

    dispatch(updateInvoice());
    dispatch(sendInstructionsToExchange());
  }
}

export const settleAllBillsLTC = () => {
  return function (dispatch, getState) {
    dispatch(checkBillCancel());

    dispatch({
      type: "SETTLE_ALL_BILLS_LTC"
    })

    dispatch(updateInvoice());
    dispatch(sendInstructionsToExchange());
  }
}

export const sendInstructionsToExchange = () => {
  return function (dispatch, getState) {
    // this function can be called multiple times, need to eventually make it so it is atomic
    var cryptocurrencyPaid = 0;
    var cryptocurrencyPrice = 0;

    if(getState().app.selectedCryptocurrency == "BTC"){
      cryptocurrencyPaid = getState().app.invoiceData.amountBTC;
      cryptocurrencyPrice = getState().app.invoiceData.priceBTC;
    }else if(getState().app.selectedCryptocurrency == "ETH"){
      cryptocurrencyPaid = getState().app.invoiceData.amountETH;
      cryptocurrencyPrice = getState().app.invoiceData.priceETH;
    }else if(getState().app.selectedCryptocurrency == "LTC"){
      cryptocurrencyPaid = getState().app.invoiceData.amountLTC;
      cryptocurrencyPrice = getState().app.invoiceData.priceLTC;
    }

    axios.post("/sendInstructionsToExchange",{
        "invoiceId": getState().app.invoiceData.invoiceId,
        "merchantId": getState().app.invoiceData.merchantId,
        "cryptocurrencyType": getState().app.selectedCryptocurrency,
        "cryptocurrencyPaid": cryptocurrencyPaid,
        "cryptocurrencyPrice": cryptocurrencyPrice,
        "paymentCurrency": getState().app.invoiceData.currency,
        "paymentAmount": getState().app.invoiceData.amount,
        "network": getState().app.invoiceData.network,
      }).then((response) => {

      })
      .catch((err) => {

      })
  }
}


export const checkBillPaid = () => {
  return function (dispatch, getState) {
    dispatch({
      type: "CHECK_BILL_PAID"
    })

    var addressReceiver;

    checkBillTimestamp = Date.now();
    checkBillTimestamp = checkBillTimestamp.toString().substring(0, 10);

    source.cancel('Operation canceled by the user.');

    var network = "mainnet";
    if(getState().app.network == "" || getState().app.network == undefined){
      network = "testnet";
    }else if(getState().app.network == "staging" || getState().app.network == "production"){
      network = "mainnet";
    }

    var payableCryptoAmount = 0;
    if(getState().app.selectedCryptocurrency == "BTC"){
      if(network == "testnet"){
        addressReceiver = getState().app.addressTestnetBTC;
      }else if(network == "mainnet"){
        addressReceiver = getState().app.addressBTC;
      }
      payableCryptoAmount = getState().app.invoiceData.amountBTC;
    }else if(getState().app.selectedCryptocurrency == "ETH"){
      if(network == "testnet"){
        addressReceiver = getState().app.addressTestnetETH;
      }else if(network == "mainnet"){
        addressReceiver = getState().app.addressETH;
      }
      payableCryptoAmount = getState().app.invoiceData.amountETH;
    }else if(getState().app.selectedCryptocurrency == "LTC"){
      if(network == "testnet"){
        addressReceiver = getState().app.addressTestnetLTC;
      }else if(network == "mainnet"){
        addressReceiver = getState().app.addressLTC;
      }
    }

    var blockOptions = {
        "address": addressReceiver,
        "amount": payableCryptoAmount,
        "timestamp": checkBillTimestamp,
        "cancelToken": source.token
    }
    if(getState().app.selectedCryptocurrency == "ETH"){
          checkBillIntervalEtherscanETH = setInterval( function() {
            checkBillDetail(urlEtherscanETH, blockOptions, "BILL_PAID_ETH_ETHERSCAN", "eth")
          }, checkBillIntervalRate);

          checkBillIntervalEthplorerETH = setInterval( function() {
            checkBillDetail(urlEthplorerETH, blockOptions, "BILL_PAID_ETH_ETHPLORER", "eth")
          }, checkBillIntervalRate + 100);

    }else if(getState().app.selectedCryptocurrency == "BTC"){
          checkBillIntervalBlocktrailBTC = setInterval( function() {
            checkBillDetail(urlBlocktrailBTC, blockOptions, "BILL_PAID_BTC_BLOCKTRAIL", "btc")
          }, checkBillIntervalRate);

          checkBillIntervalSochainBTC = setInterval( function() {
            checkBillDetail(urlSochainBTC, blockOptions, "BILL_PAID_BTC_SOCHAIN", "btc")
          }, checkBillIntervalRate + 100);

          checkBillIntervalBlockcypherBTC = setInterval( function() {
            checkBillDetail(urlBlockcypherBTC, blockOptions, "BILL_PAID_BTC_BLOCKCYPHER", "btc")
          }, checkBillIntervalRate + 200);

    }else if(getState().app.selectedCryptocurrency == "LTC"){
          checkBillIntervalSochainLTC = setInterval( function() {
            checkBillDetail(urlSochainLTC, blockOptions, "BILL_PAID_LTC_SOCHAIN", "ltc")
          }, checkBillIntervalRate);

          checkBillIntervalBlockcypherLTC = setInterval( function() {
            checkBillDetail(urlBlockcypherLTC, blockOptions, "BILL_PAID_LTC_BLOCKCYPHER", "ltc")
          }, checkBillIntervalRate + 100);

    }




    function checkBillDetail(url, blockOptions, dispatchType, crypto){
      axios.post(url, blockOptions).then((response) => {
        if(response.data.message == "success"){
          var blockNumber;
          var timestamp;
          var transactionHash;
          var blockHash;
          var amount;

          if(getState().app.confirmationBlockNumber == "" && getState().app.confirmationAmount == ""){
            blockNumber = response.data.confirmationBlockNumber;
            timestamp = response.data.confirmationTimestamp;
            transactionHash = response.data.confirmationTransactionHash;
            blockHash = response.data.confirmationBlockHash;
            amount = response.data.confirmationAmount;
          }else{
            blockNumber = getState().app.confirmationBlockNumber;
            timestamp = getState().app.confirmationTimestamp;
            transactionHash = getState().app.confirmationTransactionHash;
            blockHash = getState().app.confirmationBlockHash;
            amount = getState().app.confirmationAmount;
          }
          dispatch({
            type: dispatchType,
            confirmationBlockNumber: blockNumber,
            confirmationTimestamp: timestamp,
            confirmationTransactionHash: transactionHash,
            confirmationBlockHash: blockHash,
            confirmationAmount: amount
          })
          dispatch(checkBillCancel());

          setTimeout(
            function(){
              if(crypto == "btc"){
                dispatch(settleAllBillsBTC())
              }else if(crypto == "eth"){
                dispatch(settleAllBillsETH())
              }else if(crypto == "ltc"){
                dispatch(settleAllBillsLTC())
              }
            }, 60000);
        }else{
          // failed
          // dispatch({
          //   type: "BILL_PAID_BTC_SOCHAIN"
          // })
          // clearInterval(checkBillIntervalSochainBTC);
        }

      })
      .catch((err) => {
      })
    }

  }
}


export const checkBillCancel = () => {
  return function (dispatch, getState) {

    dispatch({
      type: "CANCEL_CHECK_BILL"
    })

    clearInterval(checkBillIntervalBlocktrailBTC);
    clearInterval(checkBillIntervalSochainBTC);
    clearInterval(checkBillIntervalBlockcypherBTC);

    clearInterval(checkBillIntervalEtherscanETH);
    clearInterval(checkBillIntervalEthplorerETH);
    clearInterval(checkBillIntervalCypherblockETH);

    clearInterval(checkBillIntervalSochainLTC);
    clearInterval(checkBillIntervalBlockcypherLTC);

  }
}
