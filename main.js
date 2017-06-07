var autobahn = require('autobahn');
var firebase = require("firebase");
var config = require("./serviceAccountKey"); //Firebase config data

firebase.initializeApp(config); //Initializing firebase
//var rootRef = firebase.database().ref();
var orderBookRef = firebase.database().ref("poloniex/orderbooks");

var cryptoCurrency = ['BTC_XRP','BTC_ETH','BTC_FCT','BTC_XMR','BTC_STR','BTC_MAID','BTC_LTC','BTC_DOGE','BTC_DASH','BTC_BTS','BTC_CLAM'];

var wsuri = "wss://api.poloniex.com";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});


connection.onopen = function (session) {
     /*
    function tickerEvent (args,kwargs) {
        console.log(args);
    }*/
    /*function trollboxEvent (args,kwargs) {
        console.log(args);
    }*/
        session.subscribe(cryptoCurrency[0], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[0]);
        });
        session.subscribe(cryptoCurrency[1], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[1]);
        });
        session.subscribe(cryptoCurrency[2], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[2]);
        });
        session.subscribe(cryptoCurrency[3], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[3]);
        });
        session.subscribe(cryptoCurrency[4], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[4]);
        });
        session.subscribe(cryptoCurrency[5], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[5]);
        });
        session.subscribe(cryptoCurrency[6], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[6]);
        });
        session.subscribe(cryptoCurrency[7], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[7]);
        });
        session.subscribe(cryptoCurrency[8], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[8]);
        });
        session.subscribe(cryptoCurrency[9], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[9]);
        });
        session.subscribe(cryptoCurrency[10], function marketEvent (args,kwargs) {
            //console.log(cryptoCurrency[i]);
            console.log(args);
            sendData(args,cryptoCurrency[10]);
        });

    /*session.subscribe('ticker', tickerEvent);*/
    //session.subscribe('trollbox', trollboxEvent);
}


connection.onclose = function () {
    console.log("Websocket connection closed");
}




connection.open();



// DATA DE EJEMPLO
var ee =[ { type: 'orderBookModify',
    data: { type: 'ask', rate: '0.09000012', amount: '0.88260028' } },
  { type: 'newTrade',
    data:
     { amount: '6.83090558',
       date: '2017-06-06 12:24:17',
       rate: '0.09000012',
       total: '0.61478232',
       tradeID: '26659710',
       type: 'buy' } } ];




var sendData = function(data_p,currency){ //Func que enviara data a firebase
    var temp;
    for (var i = 0 ; i < data_p.length; i++) {
        temp = data_p[i];
        var data = temp.data;
        switch(temp.type){
          case 'orderBookModify':
            console.log ("modif");
            break;
          case 'orderBookRemove':
            console.log("remove");
            break;
          case 'newTrade':
            console.log("Trade");
            //console.log({ amount:data.amount, date:data.date,total:data.total,tradeID:data.tradeID, type: data.type });
            console.log(currency+"/trades");
            orderBookRef.child(currency+"/trades").push({ amount:data.amount, date:data.date,total:data.total,tradeID:data.tradeID, type: data.type });
            break;
          default:
            console.log("ERROR");
        }
    }
}

/*
    for (var i = 0 ; i < cryptoCurrency.length; i++) {
        
        console.log(cryptoCurrency[i]);
    }

*/



