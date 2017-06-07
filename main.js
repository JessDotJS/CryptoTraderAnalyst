var autobahn = require('autobahn');
var firebase = require("firebase");
var config = require("./serviceAccountKey"); //Firebase config data

firebase.initializeApp(config); //Initializing firebase
var rootRef = firebase.database().ref();

var wsuri = "wss://api.poloniex.com";

var connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
});



connection.onopen = function (session) {
    function marketEvent (args,kwargs) {
        console.log(args);
    }/*
    function tickerEvent (args,kwargs) {
        console.log(args);
    }*/
    /*function trollboxEvent (args,kwargs) {
        console.log(args);
    }*/
    session.subscribe('BTC_ETH', marketEvent);
    /*session.subscribe('ticker', tickerEvent);*/
    //session.subscribe('trollbox', trollboxEvent);
}


connection.onclose = function () {
    console.log("Websocket connection closed");
}




connection.open();



// DATA DE EJEMPLO

// var ee = [ { type: 'orderBookModify',
//     data: { type: 'ask', rate: '0.09081001', amount: '0.00553905' } 
//    },
//   { type: 'orderBookModify',
//     data: { type: 'ask', rate: '0.09070999', amount: '10.94899736' } } ]

var sendData = function(data){ //Func que enviara data a firebase
    var temp1;
    for (var i = 0 ; i < data.length; i++) {
        temp1 = data[i];
        if (temp1.type == 'orderBookModify') {
            console.log ("modif");
        } else if(temp1.type == 'orderBookRemove'){
            console.log("remove");
        } else if(temp1.type == "newTrade"){
            console.log("trade");
        }else{
            console.log("error");
        }

    }
}

//sendData(ee);