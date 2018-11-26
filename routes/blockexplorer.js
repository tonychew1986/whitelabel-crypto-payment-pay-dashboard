var express = require('express');
var request = require('request');
var axios = require ('axios');
var moment = require ('moment');

var router = express.Router();

var apiUrl;

if(process.env['API_URI']){
  apiUrl = process.env['API_URI'];
}else{
  apiUrl = "http://0.0.0.0:9000";
}


router.post('/mock/approve/btc', (req, res) => {
   res.send({
     message: "success",
     confirmationBlockNumber: "123",
     confirmationTimestamp: "",
     confirmationTransactionHash: "321",
     confirmationBlockHash: "abc",
     confirmationAmount: 0.1
   });
});

router.post('/checkBillBTC/blocktrail', (req, res) => {
  console.log('/checkBillBTC/blocktrail');

  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  amount = amount * (100000000);
  //console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://api.blocktrail.com/v1/btc/address/'+address+'/transactions?api_key=MY_APIKEY&sort_dir=desc';
  }else{
    url = 'https://api.blocktrail.com/v1/tbtc/address/'+address+'/transactions?api_key=MY_APIKEY&sort_dir=desc';
  }


  axios({
    method:'get',
    url: url
  }).then((response) => {
    console.log("response.status: "+response.status)
    if(response.status !== 429){
      var loopLength;
      if(response.data.data.length < 3){
        loopLength = response.data.data.length;
      }else{
        loopLength = 3;
      }

      var transactionEntries = [];
      transactionEntries.push(response.data.txrefs[(0)]);
      transactionEntries.push(response.data.txrefs[(1)]);
      transactionEntries.push(response.data.txrefs[(2)]);

      for(var i=0; i < loopLength; i++){
        var responseTime = (moment(transactionEntries[i].time).valueOf()).toString().substring(0, 10);
        var responseValue = parseFloat((transactionEntries[i].estimated_value).toString().substring(0, 6));
        amount = parseFloat((amount).toString().substring(0, 6));
        console.log("timestamp: "+ (responseTime - timestamp));
        console.log("timestamp: "+ timestamp);
        console.log("response.data.result[i].timeStamp: "+ responseTime);
        console.log("value: "+ responseValue);

        if(responseTime - timestamp > -50){
          if(Math.round(amount) == Math.round(responseValue)){
             res.send({
               message: "success",
               confirmationBlockNumber: transactionEntries[i].block_height,
               confirmationTimestamp: responseTime,
               confirmationTransactionHash: transactionEntries[i].hash,
               confirmationBlockHash: transactionEntries[i].block_hash,
               confirmationAmount: responseValue
             });
          }
        }
      }
    }else{
       res.send({
         message: "error"
       });
    }
  }).catch(function (error) {
    //console.log(error);
     res.send({
       message: "error"
     });
  });
});

router.post('/checkBillBTC/sochain', sochainBTC, sochainVerifyTransactionLength, sochainCheckExplorer, (req, res, next) => {
   res.send({
     message: req.message,
     confirmationBlockNumber: req.confirmationBlockNumber,
     confirmationTimestamp: req.confirmationTimestamp,
     confirmationTransactionHash: req.confirmationTransactionHash,
     confirmationBlockHash: req.confirmationBlockHash,
     confirmationAmount: req.confirmationAmount
   });
});
function sochainBTC(req,res,next){
  var address = req.body.address;

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://chain.so/api/v2/get_tx_received/BTC/'+address;
  }else{
    url = 'https://chain.so/api/v2/get_tx_received/BTCTEST/'+address;
  }

  req.url = url;

  next();
}

function sochainVerifyTransactionLength(req,res,next){
  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  amount = amount * (100000000);
  console.log("amount: "+amount);

  addressCheck(req.url);

  function addressCheck(url){
    console.log("addressCheck");
    axios({
      method:'get',
      url: url
    }).then((response) => {
       if(response.data.data.txs.length > 90){
          addressCheck(url+'/'+response.data.data.txs[88].txid);
          req.transactionId = response.data.data.txs[88].txid;
          req.url = url+'/'+response.data.data.txs[88].txid;
       }else{
         req.url = url;
         req.transactionId = "";

         next();
       }

    }).catch(function (error) {
      //console.log(error);
    });
  }
}

function sochainCheckExplorer(req,res,next){
  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;
  var transactionId = req.transactionId;
  var url = req.url;

  amount = amount * (100000000);
  console.log("amount: "+amount);
  console.log("url: "+url);

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    var transactionEntries = [];

    if(response.data.data.txs.length < 3){
      loopLength = response.data.data.txs.length;

      if(loopLength == 1){
        transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 1)]);
      }else if(loopLength == 2){
        transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 1)]);
        transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 2)]);
      }
    }else{
      loopLength = 3;

      console.log("loopLength: "+loopLength);
      transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 1)]);
      transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 2)]);
      transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 3)]);
    }

    for(var i=0; i < loopLength; i++){
      var responseTime = ((transactionEntries[i].time)).toString().substring(0, 10);
      var responseValue = parseFloat((transactionEntries[i].value * (100000000)).toString().substring(0, 6));
      amount = parseFloat((amount).toString().substring(0, 6));
      console.log("timestamp: "+ (responseTime - timestamp));
      console.log("timestamp: "+ timestamp);
      console.log("response.data.result[i].timeStamp: "+ responseTime);
      console.log("value: "+ responseValue);

      if(responseTime - timestamp > -50){
        if(Math.round(amount) == Math.round(responseValue)){

          req.message = "success";
          req.confirmationBlockNumber = "";
          req.confirmationTimestamp = responseTime;
          req.confirmationTransactionHash = transactionEntries[i].txid;
          req.confirmationBlockHash = "";
          req.confirmationAmount = responseValue;

          next();
        }
      }
    }
  }).catch(function (error) {
    //console.log(error);
  });
}

router.post('/checkBillBTC/blockcypher', (req, res) => {
  console.log('/checkBillBTC/blockcypher');
  //blockcyper uses unconfirmed_txrefs

  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  amount = amount * (100000000);
  console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://api.blockcypher.com/v1/btc/main/addrs/'+address;
  }else{
    url = 'https://api.blockcypher.com/v1/btc/test3/addrs/'+address;
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    if(response.data.txrefs.length < 3){
      loopLength = response.data.txrefs.length;
    }else{
      loopLength = 3;
    }

    var transactionEntries = [];
    transactionEntries.push(response.data.txrefs[(0)]);
    transactionEntries.push(response.data.txrefs[(1)]);
    transactionEntries.push(response.data.txrefs[(2)]);

    for(var i=0; i < loopLength; i++){
      var responseTime = (moment(transactionEntries[i].confirmed).valueOf()).toString().substring(0, 10);
      var responseValue = parseFloat((transactionEntries[i].value).toString().substring(0, 6));
      amount = parseFloat((amount).toString().substring(0, 6));
      console.log("timestamp: "+ (responseTime - timestamp));
      console.log("timestamp: "+ timestamp);
      console.log("response.data.result[i].timeStamp: "+ responseTime);
      console.log("value: "+ responseValue);

      if(responseTime - timestamp > -50){
        if(Math.round(amount) == Math.round(responseValue)){
           res.send({
             message: "success",
             confirmationBlockNumber: transactionEntries[i].block_height,
             confirmationTimestamp: responseTime,
             confirmationTransactionHash: transactionEntries[i].tx_hash,
             confirmationBlockHash: "",
             confirmationAmount: responseValue
           });
        }
      }
    }
  }).catch(function (error) {
    //console.log(error);
  });
});

router.post('/checkBillETH/etherscan', (req, res) => {
  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  // convert amount into format without decimal points
  amount = amount * (1000000000);
  console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'http://api.etherscan.io/api?module=account&action=txlist&address='+address+'&startblock=50000&endblock=99999999&sort=desc&apikey=YourApiKeyToken'
  }else{
    url = 'http://ropsten.etherscan.io/api?module=account&action=txlist&address='+address+'&startblock=50000&endblock=99999999&sort=desc&apikey=YourApiKeyToken'
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    if(response.data.result.length < 3){
      loopLength = response.data.result.length;
    }else{
      loopLength = 3;
    }

    for(var i=0; i < loopLength; i++){
      var responseTime = response.data.result[i].timeStamp;
      var responseValue = parseFloat((response.data.result[i].value).toString().substring(0, 6));
      amount = parseFloat((amount).toString().substring(0, 6));
      console.log("-----------");
      console.log("timestamp: "+ (responseTime - timestamp));
      console.log("timestamp: "+ timestamp);
      console.log("response.data.result[i].timeStamp: "+ responseTime);
      console.log("value: "+ responseValue);
      console.log("Math.round(amount): "+ Math.round(amount));
      console.log("Math.round(responseValue): "+ Math.round(responseValue));
      if(responseTime - timestamp > -50){
        if(Math.round(amount) == Math.round(responseValue)){
           res.send({
             message: "success",
             confirmationBlockNumber: response.data.result[i].blockNumber,
             confirmationTimestamp: response.data.result[i].timeStamp,
             confirmationTransactionHash: response.data.result[i].hash,
             confirmationBlockHash: response.data.result[i].blockHash,
             confirmationAmount: response.data.result[i].value
           });
        }
      }
    }
    //if(currentTransactionCount < response.data.result.length){
      //sending too many times... need mechanism to limit it to 1
      // MongoClient.connect(mongolab_uri, function(err, db) {
      //   if (err) throw err;
      //   var dbo = db.db(mongolab_db);
      //   var myobj = {
      //     name: "",
      //     mobile: "",
      //     email: "",
      //     currencyType: "ETH",
      //     transactionHash: response.data.result[0].hash,
      //     addressFrom: response.data.result[0].from,
      //     addressTo: address,
      //     paidAmount: response.data.result[0].value,
      //     dateConfirmed: response.data.result[0].timeStamp,
      //     transactionTag: "ARTSTAGE"
      //   };
      //   dbo.collection("payment").insertOne(myobj, function(err, res) {
      //     if (err) throw err;
      //     console.log("1 document inserted");
      //     db.close();
      //   });
      // });
    //}
  }).catch(function (error) {
    //console.log(error);
  });
});


router.post('/checkBillETH/ethplorer', (req, res) => {
  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  // convert amount into format without decimal points
  amount = amount * (1000000000);
  console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'http://api.etherscan.io/api?module=account&action=txlist&address='+address+'&startblock=50000&endblock=99999999&sort=desc&apikey=YourApiKeyToken'
  }else{
    url = 'http://ropsten.etherscan.io/api?module=account&action=txlist&address='+address+'&startblock=50000&endblock=99999999&sort=desc&apikey=YourApiKeyToken'
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    if(response.data.result.length < 3){
      loopLength = response.data.result.length;
    }else{
      loopLength = 3;
    }

    for(var i=0; i < loopLength; i++){
      console.log("timestamp: "+ (response.data.result[i].timeStamp - timestamp));
      console.log("timestamp: "+ timestamp);
      console.log("response.data.result[i].timeStamp: "+ (response.data.result[i].timeStamp));
      console.log("value: "+ (response.data.result[i].value).toString().substring(0, 6));
      if(response.data.result[i].timeStamp - timestamp > -50){
        if(amount == parseFloat((response.data.result[i].value).toString().substring(0, 6))){
           res.send({
             message: "success",
             confirmationBlockNumber: response.data.result[i].blockNumber,
             confirmationTimestamp: response.data.result[i].timeStamp,
             confirmationTransactionHash: response.data.result[i].hash,
             confirmationBlockHash: response.data.result[i].blockHash,
             confirmationAmount: response.data.result[i].value
           });
        }
      }
    }
  }).catch(function (error) {
    //console.log(error);
  });
});


function sochainLTC(req,res,next){
  var address = req.body.address;

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://chain.so/api/v2/get_tx_received/LTC/'+address;
  }else{
    url = 'https://chain.so/api/v2/get_tx_received/LTCTEST/'+address;
  }

  req.url = url;

  next();
}

router.post('/checkBillLTC/sochain', sochainLTC, sochainVerifyTransactionLength, sochainCheckExplorer, (req, res, next) => {
   res.send({
     message: req.message,
     confirmationBlockNumber: req.confirmationBlockNumber,
     confirmationTimestamp: req.confirmationTimestamp,
     confirmationTransactionHash: req.confirmationTransactionHash,
     confirmationBlockHash: req.confirmationBlockHash,
     confirmationAmount: req.confirmationAmount
   });
});

router.post('/checkBillLTC/blockcypher', (req, res) => {
  //blockcyper uses unconfirmed_txrefs

  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  amount = amount * (100000000);
  console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://api.blockcypher.com/v1/ltc/main/addrs/'+address;
  }else{
    url = 'https://api.blockcypher.com/v1/ltc/test3/addrs/'+address;
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    if(response.data.txrefs.length < 3){
      loopLength = response.data.txrefs.length;
    }else{
      loopLength = 3;
    }

    var transactionEntries = [];
    transactionEntries.push(response.data.txrefs[(0)]);
    transactionEntries.push(response.data.txrefs[(1)]);
    transactionEntries.push(response.data.txrefs[(2)]);

    for(var i=0; i < loopLength; i++){
      var responseTime = (moment(transactionEntries[i].confirmed).valueOf()).toString().substring(0, 10);
      var responseValue = parseFloat((transactionEntries[i].value).toString().substring(0, 6));
      amount = parseFloat((amount).toString().substring(0, 6));
      console.log("timestamp: "+ (responseTime - timestamp));
      console.log("timestamp: "+ timestamp);
      console.log("response.data.result[i].timeStamp: "+ responseTime);
      console.log("value: "+ responseValue);

      if(responseTime - timestamp > -50){
        if(Math.round(amount) == Math.round(responseValue)){
           res.send({
             message: "success",
             confirmationBlockNumber: transactionEntries[i].block_height,
             confirmationTimestamp: responseTime,
             confirmationTransactionHash: transactionEntries[i].tx_hash,
             confirmationBlockHash: "",
             confirmationAmount: responseValue
           });
        }
      }
    }
  }).catch(function (error) {
    //console.log(error);
  });
});

module.exports = router;
