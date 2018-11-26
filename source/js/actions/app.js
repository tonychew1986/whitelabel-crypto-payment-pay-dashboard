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

export const selectCryptocurrency = (curr) => {
  return function (dispatch, getState) {
    var cryptoAmt;
    var price;

    let priceBTCDisplay;
    let priceETHDisplay;
    let priceLTCDisplay;
    let priceADIDisplay;

    if(getState().app.fiatCurrencySelected == "usd"){
      priceBTCDisplay = (getState().app.priceBTC).toFixed(2);
      priceETHDisplay = (getState().app.priceETH).toFixed(2);
      priceLTCDisplay = (getState().app.priceLTC).toFixed(2);
      priceADIDisplay = (getState().app.priceADI).toFixed(2);
    }else if(getState().app.fiatCurrencySelected == "sgd"){
      priceBTCDisplay = (getState().app.priceBTC * getState().app.USDSGD).toFixed(2);
      priceETHDisplay = (getState().app.priceETH * getState().app.USDSGD).toFixed(2);
      priceLTCDisplay = (getState().app.priceLTC * getState().app.USDSGD).toFixed(2);
      priceADIDisplay = (getState().app.priceADI * getState().app.USDSGD).toFixed(2);
    }

    if(curr == "BTC"){
      cryptoAmt = (getState().app.dollarValuePayAmount/priceBTCDisplay).toFixed(6);
      price = priceBTCDisplay;
    }else if(curr == "ETH"){
      cryptoAmt = (getState().app.dollarValuePayAmount/priceETHDisplay).toFixed(6);
      price = priceETHDisplay;
    }else if(curr == "LTC"){
      cryptoAmt = (getState().app.dollarValuePayAmount/priceLTCDisplay).toFixed(6);
      price = priceLTCDisplay;
    }else if(curr == "ADI"){

    }

    dispatch({
      type: "SELECT_CRYPTOCURRENCY",
      network: getState().app.invoiceData.network,
      selectedCryptocurrency: curr,
      selectedCryptocurrencyPrice: price,
      cryptocurrencyPayAmount: cryptoAmt
    })
  }
}

// export const updatePaymentParams = (merchantId, fiat, val, productReference, account) => {
//   return function (dispatch, getState) {
//     dispatch({
//       type: "UPDATE_PAYMENT_PARAMETERS",
//       merchantId: merchantId,
//       fiatCurrency: fiat,
//       dollarValuePayAmount: val,
//       productReference: productReference,
//       merchantName: account.name,
//       addressBTC: account.addressBTC,
//       addressETH: account.addressETH,
//       addressLTC: account.addressLTC,
//       addressADI: account.addressADI
//     })
//   }
// }
//
// export const updateShippingDetails = (name, email, country, address, postalCode, mobile) => {
//   return function (dispatch, getState) {
//     dispatch({
//       type: "UPDATE_SHIPPING_DETAILS",
//       name: name,
//       email: email,
//       country: country,
//       address: address,
//       postalCode: postalCode,
//       mobile: mobile
//     })
//   }
// }

export const billExpire = () => {
  return function (dispatch, getState) {
    dispatch({
      type: "BILL_EXPIRE"
    })
    dispatch(expireInvoice());
    dispatch(checkBillCancel());
  }
}



// export const mockApprove = () => {
//   return function (dispatch, getState) {
//
//     if(getState().app.selectedCryptocurrency == "BTC"){
//       dispatch({
//         type: "BILL_PAID_BTC_SOCHAIN",
//         confirmationBlockNumber: "123",
//         confirmationTimestamp: "",
//         confirmationTransactionHash: "321",
//         confirmationBlockHash: "abc",
//         confirmationAmount: 0.1
//       })
//       clearInterval(checkBillIntervalSochainBTC);
//
//       setTimeout(
//         function(){
//           dispatch(settleAllBillsBTC())
//         }, 60000);
//
//     }else if(getState().app.selectedCryptocurrency == "ETH"){
//       dispatch({
//         type: "BILL_PAID_ETH_ETHERSCAN",
//         confirmationBlockNumber: "123",
//         confirmationTimestamp: "",
//         confirmationTransactionHash: "321",
//         confirmationBlockHash: "abc",
//         confirmationAmount: 0.1
//       })
//       clearInterval(checkBillIntervalEtherscanETH);
//
//       setTimeout(
//         function(){
//           dispatch(settleAllBillsETH())
//         }, 60000);
//     }else if(getState().app.selectedCryptocurrency == "LTC"){
//       dispatch({
//         type: "BILL_PAID_LTC_SOCHAIN",
//         confirmationBlockNumber: "123",
//         confirmationTimestamp: "",
//         confirmationTransactionHash: "321",
//         confirmationBlockHash: "abc",
//         confirmationAmount: 0.1
//       })
//       clearInterval(checkBillIntervalSochainLTC);
//
//       setTimeout(
//         function(){
//           dispatch(settleAllBillsLTC())
//         }, 60000);
//
//     }
//   }
// }


// export const initiatePayment = (status) => {
//   return function (dispatch, getState) {
//     //dispatch(getState().routing.push('/foo'));
//     // there are some inconsitency with naming on api and redux state
//
//     var cryptocurrencyPrice;
//     var addressReceiver;
//     var network = "mainnet";
//     if(getState().app.network == "" || getState().app.network == undefined){
//       network = "testnet";
//     }else if(getState().app.network == "staging" || getState().app.network == "production"){
//       network = "mainnet";
//     }
//     if(getState().app.selectedCryptocurrency == "BTC"){
//       if(getState().app.fiatCurrency == "usd"){
//         cryptocurrencyPrice = getState().app.priceBTC;
//       }else if(getState().app.fiatCurrency == "sgd"){
//         cryptocurrencyPrice = getState().app.priceBTC * getState().app.USDSGD;
//       }
//       if(network == "testnet"){
//         addressReceiver = "mgALwtZqdmCpqwEnYKoHr39kAWpPhpPf1L";
//       }else if(network == "mainnet"){
//         addressReceiver = getState().app.addressBTC;
//       }
//     }else if(getState().app.selectedCryptocurrency == "ETH"){
//       if(getState().app.fiatCurrency == "usd"){
//         cryptocurrencyPrice = getState().app.priceETH;
//       }else if(getState().app.fiatCurrency == "sgd"){
//         cryptocurrencyPrice = getState().app.priceETH * getState().app.USDSGD;
//       }
//           console.log("cryptocurrencyPrice: "+cryptocurrencyPrice)
//       if(network == "testnet"){
//         addressReceiver = "0xaD74621d27e8c769Cc6AA6bD3f5Ee577BF92C750";
//       }else if(network == "mainnet"){
//         addressReceiver = getState().app.addressETH;
//       }
//     }else if(getState().app.selectedCryptocurrency == "LTC"){
//       if(getState().app.fiatCurrency == "usd"){
//         cryptocurrencyPrice = getState().app.priceLTC;
//       }else if(getState().app.fiatCurrency == "sgd"){
//         cryptocurrencyPrice = getState().app.priceLTC * getState().app.USDSGD;
//       }
//       if(network == "testnet"){
//         addressReceiver = "mpdTNiSCqyCvK84nJkrpopueGxomYMJXoD";
//       }else if(network == "mainnet"){
//         addressReceiver = getState().app.addressLTC;
//       }
//     }
//
//     console.log("cryptocurrencyPrice: "+cryptocurrencyPrice)
//
//     dispatch({
//       type: "UPDATE_SELECTED_CRYPTOCURRENCY_PRICE",
//       selectedCryptocurrencyPrice: cryptocurrencyPrice
//     })
//
//     axios.post("/initiatePayment",{
//         "merchantId": getState().app.merchantId,
//         "merchantName": getState().app.merchantName,
//         "paymentDollarValue": getState().app.dollarValuePayAmount,
//         "cryptocurrencyPaid": getState().app.cryptocurrencyPayAmount,
//         "paymentCurrency": getState().app.fiatCurrency,
//         "productReference": getState().app.productReference,
//         "network": network,
//         "addressReceiver": addressReceiver,
//         "paymentType": "external",
//         "cryptocurrencyType": getState().app.selectedCryptocurrency,
//         "cryptocurrencyPrice": cryptocurrencyPrice,
//         "shippingName": getState().app.shippingName,
//         "shippingEmail": getState().app.shippingEmail,
//         "shippingMobile": getState().app.shippingMobile,
//         "shippingCountry": getState().app.shippingCountry,
//         "shippingAddress": getState().app.shippingAddress,
//         "shippingPostal": getState().app.shippingPostal
//       }).then((response) => {
//         if(response.data.message == "success"){
//           dispatch({
//             type: "INITIATE_PAYMENT",
//             generatedTransactionId: response.data.transactionId
//           })
//           if(status == 1){
//             dispatch(checkBillPaid());
//           }else if(status == 0){
//             dispatch(mockApprove());
//           }
//         }else{
//
//         }
//       })
//       .catch((err) => {
//
//       })
//   }
// }



export const updateFiatCurrencySelected = (curr) => {
  return function (dispatch, getState) {
    dispatch({
      type: "UPDATE_FIAT_CURRENCY_SELECTED",
      fiatCurrencySelected: curr
    })
  }
}

export const sendPaymentOrderEmail = () => {
  return function (dispatch, getState) {
    axios.post("/sendPaymentOrderEmail",{
        "transactionId": getState().app.generatedTransactionId
      }).then((response) => {
        if(response.data.message == "success"){

        }else{

        }
      })
      .catch((err) => {

      })
  }
}

// export const checkPaymentParams = (merchantId, fiat, val, productReference) => {
//   return function (dispatch, getState) {
//     dispatch({
//       type: "CHECK_PAYMENT_PARAMETERS",
//       merchantId, fiat, val, productReference
//     })
//     axios.post("/getMerchantDetail",{
//         "merchantId": merchantId
//       }).then((response) => {
//         if(response.data.message == "success"){
//           dispatch(updatePaymentParams(merchantId, fiat, val, productReference, response.data.account));
//
//           dispatch({
//             type: "NETWORK_DETECTED",
//             network: response.data.network
//           })
//         }else{
//           dispatch({
//             type: "PAYMENT_PARAMETERS_FAILED"
//           })
//         }
//       })
//       .catch((err) => {
//
//       })
//   }
// }


export const clearCheckedInvoice = () => {
  return function (dispatch, getState) {
    dispatch({
      type: "CLEAR_CHECKED_INVOICE"
    })
  }
}

export const checkTransaction = (id) => {
  return function (dispatch, getState) {
    dispatch({
      type: "CHECK_TRANSACTION"
    })
    axios.post("/checkTransaction",{
        "id": id
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DISPLAY_CHECKED_TRANSACTION",
            transactionData: response.data.transactionData
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const checkInvoice = (id) => {
  return function (dispatch, getState) {
    //check if invoice is completed
    // do a checkbill function when page load in case payment went thru but didnt update database
    dispatch({
      type: "CHECK_INVOICE"
    })
    axios.post("/checkInvoice",{
        "id": id
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "UPDATE_INVOICE_DATA",
            invoiceData: response.data.invoiceData
          })
          dispatch( getMerchantAddress(response.data.invoiceData.merchantId) );
        }else if(response.data.message == "fail"){
          dispatch({
            type: "INVALID_INVOICE"
          })
        }
      })
      .catch((err) => {

      })
  }
}


export const getMerchantAddress = (merchantId) => {
  return function (dispatch, getState) {
    axios.post("/getMerchantDetail",{
        "merchantId": merchantId
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "GET_MERCHANT_ADDRESS_SUCCESS",
            account: response.data.account
          })
        }else{
          dispatch({
            type: "GET_MERCHANT_ADDRESS_FAIL"
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const updateInvoice = () => {
  return function (dispatch, getState) {

    // confirmationBlockNumber: blockNumber,
    // confirmationTimestamp: timestamp,
    // confirmationTransactionHash: transactionHash,
    // confirmationBlockHash: blockHash,
    // confirmationAmount: amount
    axios.post("/updateInvoice",{
        "invoiceId": getState().app.invoiceData.invoiceId,
        "paidCryptocurrency": getState().app.selectedCryptocurrency,
        "blockchainHash": getState().app.confirmationTransactionHash,
        "cryptoAddress": getState().app.selectedCryptocurrencyAddress,
        "paymentType": "external",
        "platform": "website"
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "INVOICE_COMPLETED"
          })
        }
      })
      .catch((err) => {

      })
  }
}


export const checkInterfaceScheme = () => {
  return function (dispatch, getState) {
    axios.get("/checkInterfaceScheme").then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "CHECK_INTERFACE_SCHEME",
            logo: response.data.logo,
            colorScheme: response.data.colorScheme
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const expireInvoice = () => {
  return function (dispatch, getState) {

    // confirmationBlockNumber: blockNumber,
    // confirmationTimestamp: timestamp,
    // confirmationTransactionHash: transactionHash,
    // confirmationBlockHash: blockHash,
    // confirmationAmount: amount
    axios.post("/expireInvoice",{
        "invoiceId": getState().app.invoiceData.invoiceId
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "INVOICE_EXPIRED"
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const createInvoice = (merchantAccountId, amount, currency, referenceCode, shopName, testMode, signature, urlCallback, urlCancel, urlComplete, name, email, country, address, city, state, postalCode, mobile, description) => {
  return function (dispatch, getState) {
    dispatch({
      type: "CREATE_INVOICE"
    })

    var network = "mainnet";
    if(testMode == true){
      network = "testnet";
    }else{
      network = "mainnet";
    }

    axios.post("/createInvoice",{
        "merchantId": merchantAccountId,
        "merchantName": shopName,
        "amount": amount,
        //"cryptocurrencyPaid": getState().app.cryptocurrencyPayAmount,
        "currency": currency,
        "productReference": referenceCode,
        "network": network,
        "signature": signature,
        "url_callback": urlCallback,
        "url_cancel": urlCancel,
        "url_complete": urlComplete,
        //"addressReceiver": addressReceiver,
        //"paymentType": "external",
        "description": description,
        //"cryptocurrencyType": getState().app.selectedCryptocurrency,
        //"cryptocurrencyPrice": cryptocurrencyPrice,
        "customerName": name,
        "customerEmail": email,
        "customerMobile": mobile,
        "customerCountry": country,
        "customerAddress": address,
        "customerCity": city,
        "customerState": state,
        "customerPostal": postalCode
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "INVOICE_CREATED",
            invoiceId: response.data.invoiceId
          })
        }else{

        }
      })
      .catch((err) => {

      })
  }
}


export const createInvoiceWithoutRedirect = (merchantAccountId, amount, currency, referenceCode, shopName, testMode, signature, urlCallback, urlCancel, urlComplete, name, email, country, address, city, state, postalCode, mobile, description) => {
  return function (dispatch, getState) {
    dispatch({
      type: "CREATE_INVOICE"
    })

    var network = "mainnet";
    if(testMode == true){
      network = "testnet";
    }else{
      network = "mainnet";
    }

    axios.post("/createInvoiceWithoutRedirect",{
        "merchantId": merchantAccountId,
        "merchantName": shopName,
        "amount": amount,
        //"cryptocurrencyPaid": getState().app.cryptocurrencyPayAmount,
        "currency": currency,
        "productReference": referenceCode,
        "network": network,
        "signature": signature,
        "url_callback": urlCallback,
        "url_cancel": urlCancel,
        "url_complete": urlComplete,
        //"addressReceiver": addressReceiver,
        //"paymentType": "external",
        "description": description,
        //"cryptocurrencyType": getState().app.selectedCryptocurrency,
        //"cryptocurrencyPrice": cryptocurrencyPrice,
        "customerName": name,
        "customerEmail": email,
        "customerMobile": mobile,
        "customerCountry": country,
        "customerAddress": address,
        "customerCity": city,
        "customerState": state,
        "customerPostal": postalCode
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "INVOICE_CREATED",
            invoiceId: response.data.invoiceId
          })
        }else{

        }
      })
      .catch((err) => {

      })
  }
}


export const getPrices = () => {
  return function (dispatch, getState) {
    dispatch({
      type: "GET_PRICES_LOADING"
    })
    axios.post("/price").then((response) => {
        dispatch({
          type: "GET_PRICES",
          priceLTC: response.data.priceLTC,
          priceBTC: response.data.priceBTC,
          priceETH: response.data.priceETH,
          USDSGD: response.data.USDSGD
        })
        dispatch(selectCryptocurrency("BTC"));
      })
      .catch((err) => {

      })
  }
}

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
