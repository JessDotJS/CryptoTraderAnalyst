var autobahn = require('autobahn');
var firebase = require("firebase");
var config = require("./serviceAccountKey"); //Firebase config data

firebase.initializeApp(config); //Initializing firebase
//var rootRef = firebase.database().ref();
var orderBookRef = firebase.database().ref("poloniex/orderbook");

var cryptoCurrency = ['BTC_XRP','BTC_ETH','BTC_FCT','BTC_XMR','BTC_STR','BTC_MAID','BTC_LTC','BTC_DOGE','BTC_DASH','BTC_BTS','BTC_CLAM'];

var wsuri = "wss://api.poloniex.com";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});



connection.onopen = function (session) {
    function marketEvent (args,kwargs) {
        console.log(args);

        sendData(args,cryptoCurrency[1]);
    }/*
    function tickerEvent (args,kwargs) {
        console.log(args);
    }*/
    /*function trollboxEvent (args,kwargs) {
        console.log(args);
    }*/
    session.subscribe(cryptoCurrency[1], marketEvent);
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
            // rootRef.push({ name:"Lesther", email: "eel@gmail.com" });
            break;
          case 'orderBookRemove':
            console.log("remove");
            break;
          case 'newTrade':
            console.log("Trade");
            //console.log({ amount:data.amount, date:data.date,total:data.total,tradeID:data.tradeID, type: data.type });
            orderBookRef.child("trades"+"/"+currency).push({ amount:data.amount, date:data.date,total:data.total,tradeID:data.tradeID, type: data.type });
            break;
          default:
            console.log("ERROR");
        }
    }
}

//sendData(ee);





