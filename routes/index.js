var express = require('express');
var request = require('request');
var axios = require ('axios');
var uniqid = require('uniqid');
const uuidv4 = require('uuid/v4');


var router = express.Router();

var apiUrl;
var exchangeUrl;

if(process.env['API_URI']){
  apiUrl = process.env['API_URI'];
}else{
  apiUrl = "http://0.0.0.0:9000";
}

if(process.env['EXCHANGE_URI']){
  exchangeUrl = process.env['EXCHANGE_URI'];
}else{
  exchangeUrl = "http://localhost:3004";
}

router.get('/', (req, res) => {
  var scheme = "schemeDefault";

  if(process.env['COLOR_SCHEME'] == "black"){
    scheme = "schemeBlack";
  }

  res.render('application', {
    title: 'White label crypto payment',
    scheme: scheme
  });
});

router.get('/checkInterfaceScheme', (req, res) => {
  res.send({
    "message": "success",
    "logo": process.env['LOGO'],
    "colorScheme": process.env['COLOR_SCHEME']
  });
});

router.post('/getMerchantDetail', (req, res) => {
  var merchantId = req.body.merchantId;

  var url = apiUrl+'/api/merchants/'+merchantId; //5a782fc9a0fde4207b550e7e

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "account": data,
        "network": process.env['ENV']
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/checkTransaction', (req, res) => {
  var id = req.body.id;

  var url = apiUrl+'/api/invoices/'+id; //5a782fc9a0fde4207b550e7e

  var options = {
      url: url
  };

  console.log(url);
  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "transactionData": data
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/checkInvoice', (req, res) => {
  var id = req.body.id;

  var url = apiUrl+'/api/invoices/'+id; //5a782fc9a0fde4207b550e7e

  var options = {
      url: url
  };

  console.log(url);
  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "invoiceData": data
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});



router.post('/sendInstructionsToExchange', (req, res) => {
  var invoiceId = req.body.invoiceId;
  var merchantId = req.body.merchantId;
  var cryptocurrencyType = req.body.cryptocurrencyType;
  var cryptocurrencyPaid = req.body.cryptocurrencyPaid;
  var cryptocurrencyPrice = req.body.cryptocurrencyPrice;
  var paymentCurrency = req.body.paymentCurrency;
  var paymentAmount = req.body.paymentAmount;
  var network = req.body.network;

  var url = exchangeUrl+'/settlements/receivePaymentInfo';

  console.log("sendInstructionsToExchange");

  var options = {
      url: url,
      form: {
        "secret": process.env['CSRF_SECRET'],
        "invoiceId": invoiceId,
        "merchantId": merchantId,
        "cryptocurrencyType": cryptocurrencyType,
        "cryptocurrencyPaid": cryptocurrencyPaid,
        "cryptocurrencyPrice": cryptocurrencyPrice,
        "paymentCurrency": paymentCurrency,
        "paymentAmount": paymentAmount,
        "network": network
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data.message);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});


router.post('/sendPaymentOrderEmail', (req, res) => {
  var transactionId = req.body.transactionId;

  var url = apiUrl+'/api/transactions/purchase-confirmation';

  var options = {
      url: url,
      form: {
        "access_token": process.env['ACCESS_TOKEN'],
        "transactionId": transactionId
      }
  };

  console.log(url);
  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  if(process.env['API_URI']){
    request.post(options, callback);
  }
});

function checkIfMerchantValid(req, res, next){
  var merchantId = req.body.merchantId;
  var merchantName = req.body.merchantName;


  let url = apiUrl+'/api/merchants/'+merchantId;

  console.log("url: "+url);

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);

      req.checkingStatus = "success";

      next();
    }else{
      req.checkingStatus = "merchant invalid";

      next();
    }
  }

  request.get(options, callback);
}

router.post('/createInvoice', checkIfMerchantValid, (req, res) => {
  // add check to see if merchant Id and name matches
  var merchantId = req.body.merchantId;
  var merchantName = req.body.merchantName;
  var amount = parseFloat(req.body.amount);
  var currency = req.body.currency;
  var productReference = req.body.productReference;
  var network = req.body.network;
  var signature = req.body.signature;
  var url_callback = req.body.url_callback;
  var url_cancel = req.body.url_cancel;
  var url_complete = req.body.url_complete;
  var customerName = req.body.customerName;
  var customerEmail = req.body.customerEmail;
  var customerMobile = req.body.customerMobile;
  var customerCountry = req.body.customerCountry;
  var customerAddress = req.body.customerAddress;
  var customerCity = req.body.customerCity;
  var customerState = req.body.customerState;
  var customerPostal = req.body.customerPostal;
  var invoiceId = uuidv4(); //uniqid('i') + "-" + uniqid.time();

  var priceBTC = 0;
  var priceETH = 0;
  var priceLTC = 0;
  var USDSGD = 0;

  var generatedSignatureHash = "";

  console.log("req.checkingStatus: "+req.checkingStatus);

  if(req.checkingStatus == "success"){

    function getBTC() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    }
    function getLTC() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/litecoin/');
    }
    function getETH() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/');
    }
    // function getUSDtoSGD(){
    //   return axios.get('https://api.fixer.io/latest?base=USD&symbols=SGD');
    // }
    axios.all([getBTC(), getLTC(), getETH()])
    .then(axios.spread((btc, ltc, eth) => {
      var pricePremiumPercentage = 3;
      priceBTC = ((((btc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      priceLTC = ((((ltc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      priceETH = ((((eth.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      USDSGD = 1.4; //usd.data.rates.SGD;

      var amountFactoringCurrency;
      if(amount == "sgd"){
        amountFactoringCurrency = amount * USDSGD;
      }else{
        amountFactoringCurrency = amount;
      }

      amountBTC = (amountFactoringCurrency/priceBTC).toFixed(6);
      amountETH = (amountFactoringCurrency/priceETH).toFixed(6);
      amountLTC = (amountFactoringCurrency/priceLTC).toFixed(6);

        var url = apiUrl+'/api/invoices';

        var options = {
            url: url,
            form: {
              status: "pending",
              merchantId: merchantId,
              merchantName: merchantName,
              amount: amount,
              currency: currency,
              priceBTC: priceBTC,
              priceETH: priceETH,
              priceLTC: priceLTC,
              amountBTC: amountBTC,
              amountETH: amountETH,
              amountLTC: amountLTC,
              USDSGD: USDSGD,
              productReference: productReference,
              network: network,
              signature: signature,
              urlCallback: url_callback,
              urlCancel: url_cancel,
              urlComplete: url_complete,
              customerName: customerName,
              customerEmail: customerEmail,
              customerMobile: customerMobile,
              customerCountry: customerCountry,
              customerAddress: customerAddress,
              customerCity: customerCity,
              customerState: customerState,
              customerPostal: customerPostal,
              invoiceId: invoiceId
            }
        };

        console.log("options: "+options);
        function callback(error, response, body) {
          if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            var data = JSON.parse(body);
            console.log('data: '+data);
            // res.send({
            //   "message": "success",
            //   "invoiceId": invoiceId
            // });
            res.redirect("/#/invoice/"+invoiceId);
          }else{
            res.send({
              "message": "fail"
            });
          }
        }
      request.post(options, callback);
    }))

  }else if(req.checkingStatus == "merchant invalid"){
    res.redirect("/#/invoice/"+"invalid");
    // res.send({
    //   "message": "merchant invalid"
    // });
  }else{
    res.send({
      "message": "signature fail"
    });
  }



  //request.post(options, callback);
});

router.post('/createInvoiceWithoutRedirect', checkIfMerchantValid, (req, res) => {
  var merchantId = req.body.merchantId;
  var merchantName = req.body.merchantName;
  var amount = parseFloat(req.body.amount);
  var currency = req.body.currency;
  var productReference = req.body.productReference;
  var network = req.body.network;
  var signature = req.body.signature;
  var url_callback = req.body.url_callback;
  var url_cancel = req.body.url_cancel;
  var url_complete = req.body.url_complete;
  var customerName = req.body.customerName;
  var customerEmail = req.body.customerEmail;
  var customerMobile = req.body.customerMobile;
  var customerCountry = req.body.customerCountry;
  var customerAddress = req.body.customerAddress;
  var customerCity = req.body.customerCity;
  var customerState = req.body.customerState;
  var customerPostal = req.body.customerPostal;
  var invoiceId = uuidv4(); //uniqid('i') + "-" + uniqid.time();

  var priceBTC = 0;
  var priceETH = 0;
  var priceLTC = 0;
  var USDSGD = 0;

  var generatedSignatureHash = "";

  console.log("req.checkingStatus: "+req.checkingStatus);

  if(req.checkingStatus == "success"){

    function getBTC() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
    }
    function getLTC() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/litecoin/');
    }
    function getETH() {
      return axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/');
    }
    // function getUSDtoSGD(){
    //   return axios.get('https://api.fixer.io/latest?base=USD&symbols=SGD');
    // }
    axios.all([getBTC(), getLTC(), getETH()])
    .then(axios.spread((btc, ltc, eth) => {
      var pricePremiumPercentage = 3;
      priceBTC = ((((btc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      priceLTC = ((((ltc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      priceETH = ((((eth.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage);
      USDSGD = 1.4; //usd.data.rates.SGD;

      var amountFactoringCurrency;
      if(amount == "sgd"){
        amountFactoringCurrency = amount * USDSGD;
      }else{
        amountFactoringCurrency = amount;
      }

      amountBTC = (amountFactoringCurrency/priceBTC).toFixed(6);
      amountETH = (amountFactoringCurrency/priceETH).toFixed(6);
      amountLTC = (amountFactoringCurrency/priceLTC).toFixed(6);

        var url = apiUrl+'/api/invoices';

        var options = {
            url: url,
            form: {
              status: "pending",
              merchantId: merchantId,
              merchantName: merchantName,
              amount: amount,
              currency: currency,
              priceBTC: priceBTC,
              priceETH: priceETH,
              priceLTC: priceLTC,
              amountBTC: amountBTC,
              amountETH: amountETH,
              amountLTC: amountLTC,
              USDSGD: USDSGD,
              productReference: productReference,
              network: network,
              signature: signature,
              urlCallback: url_callback,
              urlCancel: url_cancel,
              urlComplete: url_complete,
              customerName: customerName,
              customerEmail: customerEmail,
              customerMobile: customerMobile,
              customerCountry: customerCountry,
              customerAddress: customerAddress,
              customerCity: customerCity,
              customerState: customerState,
              customerPostal: customerPostal,
              invoiceId: invoiceId
            }
        };

        console.log("options: "+options);
        function callback(error, response, body) {
          if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            var data = JSON.parse(body);
            console.log('data: '+data);
            res.send({
              "message": "success",
              "invoiceId": invoiceId
            });
          }else{
            res.send({
              "message": "fail"
            });
          }
        }
      request.post(options, callback);
    }))


  }else if(req.checkingStatus == "merchant invalid"){
    res.send({
      "message": "merchant invalid"
    });
  }else{
    res.send({
      "message": "signature fail"
    });
  }


  //request.post(options, callback);
});

router.post('/updateInvoice', (req, res) => {
  var invoiceId = req.body.invoiceId;
  var paidCryptocurrency = req.body.paidCryptocurrency;
  var blockchainHash = req.body.blockchainHash;
  var cryptoAddress = req.body.cryptoAddress;
  var paymentType = req.body.paymentType;
  var platform = req.body.platform;

  var url = apiUrl+'/api/invoices/'+invoiceId;

  var options = {
      url: url,
      form: {
        status: "detected",
        paidCryptocurrency: paidCryptocurrency,
        blockchainHash: blockchainHash,
        cryptoAddress: cryptoAddress,
        paymentType: paymentType,
        platform: platform
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }
  request.put(options, callback);
});

router.post('/expireInvoice', (req, res) => {
  var invoiceId = req.body.invoiceId;

  var url = apiUrl+'/api/invoices/'+invoiceId;

  var options = {
      url: url,
      form: {
        status: "expired"
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }
  request.put(options, callback);
});



router.post('/initiatePayment', (req, res) => {
  var merchantId = req.body.merchantId;
  var merchantName = req.body.merchantName;
  var paymentDollarValue = req.body.paymentDollarValue;
  var cryptocurrencyPaid = req.body.cryptocurrencyPaid;
  var cryptocurrencyType = req.body.cryptocurrencyType;
  var paymentCurrency = req.body.paymentCurrency;
  var productReference = req.body.productReference;
  var transactionStatus = "pending";
  var network = req.body.network;
  var addressReceiver = req.body.addressReceiver;
  var paymentType = req.body.paymentType;
  var cryptocurrencyPrice = req.body.cryptocurrencyPrice;
  var shippingName = req.body.shippingName;
  var shippingEmail = req.body.shippingEmail;
  var shippingMobile = req.body.shippingMobile;
  var shippingCountry = req.body.shippingCountry;
  var shippingAddress = req.body.shippingAddress;
  var shippingPostal = req.body.shippingPostal;
  var transactionId = uniqid('t');

  var url = apiUrl+'/api/transactions';

  var options = {
      url: url,
      form: {
        merchantId: merchantId,
        merchantName: merchantName,
        transactionId: transactionId,
        paymentDollarValue: paymentDollarValue,
        cryptocurrencyPaid: cryptocurrencyPaid,
        cryptocurrencyType: cryptocurrencyType,
        paymentCurrency: paymentCurrency,
        productReference: productReference,
        transactionStatus: transactionStatus,
        network: network,
        addressReceiver: addressReceiver,
        paymentType: paymentType,
        cryptocurrencyPrice: cryptocurrencyPrice,
        shippingName: shippingName,
        shippingEmail: shippingEmail,
        shippingMobile: shippingMobile,
        shippingCountry: shippingCountry,
        shippingAddress: shippingAddress,
        shippingPostal: shippingPostal
      }
  };

  console.log("paymentDollarValue: "+paymentDollarValue);
  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "transactionId": transactionId
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/price', (req, res) => {
  function getBTC() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/');
  }
  function getLTC() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/litecoin/');
  }
  function getETH() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/');
  }
  // function getUSDtoSGD(){
  //   return axios.get('https://api.fixer.io/latest?base=USD&symbols=SGD');
  // }
  axios.all([getBTC(), getLTC(), getETH()])
  .then(axios.spread((btc, ltc, eth) => {
    var pricePremiumPercentage = 3;
    res.send({
      "priceBTC": ((((btc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage),
      "priceLTC": ((((ltc.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage),
      "priceETH": ((((eth.data[0].price_usd) * 1).toFixed(2))/100)*(100-pricePremiumPercentage),
      "USDSGD": 1.4 //usd.data.rates.SGD;
    });
  }))
});

module.exports = router;
