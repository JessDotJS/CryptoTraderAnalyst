/**
 * Created by Computadora on 17-Mar-17.
 */

//HTTP
var http = require("http");
var https = require("https");

//Firebase
var firebase = require("firebase");
firebase.initializeApp({
    apiKey: "AIzaSyARg59MJuXQ9vej04rp5IW4TEoot226CUw",
    authDomain: "crypto-ea7ce.firebaseapp.com",
    databaseURL: "https://crypto-ea7ce.firebaseio.com",
    storageBucket: "crypto-ea7ce.appspot.com",
    messagingSenderId: "542355871999"
});
var rootRef = firebase.database().ref();



/*
* Dolar Today
* */

setInterval(function() {
    https.get({
        host: 'cambiaelmundo.net',
        path: '/extractor/dollar/dolartoday.php?json=yes'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var price = JSON.parse(body).USD.dolartoday;
            var ref = rootRef.child('marketReference/dolarToday');
            ref.set(price)
        });
    });
}, 5000);


/*
 * CoinMarketCap API
 * */


//Bitcoin
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/bitcoin/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/BTC');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

//Ethereum
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/ethereum/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/ETH');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

//Dash
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/dash/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/DASH');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

//REP
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/augur/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/REP');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

//ETC
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/ethereum-classic/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/ETC');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

//SDC
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/shadowcash/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoReference/SDC');
            ref.set(buildCryptoReference(data))
        });
    });
}, 10000);

function buildCryptoReference(data){
    var r = JSON.parse(data);
    return {
        price: r[0]['price_usd'] || 0,
        volume_24h: r[0]['24h_volume_usd'] || 0,
        marketCapital: r[0]['market_cap_usd'] || 0,
        supply: r[0]['available_supply'] || 0,
        change_1h: r[0]['percent_change_1h'] || 0,
        change_24h: r[0]['percent_change_24h'] || 0,
        change_7d: r[0]['percent_change_7d'] || 0
    }
}



/*
 * Shapeshift API
 * */


//BTC -> ALT
setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/btc_dash'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/BTC_DASH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/btc_eth'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/BTC_ETH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/btc_rep'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/BTC_REP');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/btc_etc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/BTC_ETC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/btc_sdc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/BTC_SDC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


//DASH -> BTC || ALT

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/dash_btc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/DASH_BTC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/dash_eth'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/DASH_ETH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/dash_rep'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/DASH_REP');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/dash_etc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/DASH_ETC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/dash_sdc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/DASH_SDC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);





//ETH -> BTC || ALT


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/eth_btc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETH_BTC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/eth_dash'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETH_DASH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/eth_rep'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETH_REP');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/eth_etc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETH_ETC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/eth_sdc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETH_SDC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



//REP -> BTC || ALT

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/rep_btc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/REP_BTC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/rep_eth'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/REP_ETH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/rep_dash'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/REP_DASH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/rep_etc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/REP_ETC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/rep_sdc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/REP_SDC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



//ETC -> BTC || ALT

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/etc_btc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETC_BTC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/etc_eth'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETC_ETH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/etc_dash'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETC_DASH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/etc_rep'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETC_REP');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/etc_sdc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/ETC_SDC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);



//SDC -> BTC || ALT

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/sdc_btc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/SDC_BTC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/sdc_eth'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/SDC_ETH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/sdc_dash'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/SDC_DASH');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/sdc_rep'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/SDC_REP');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/sdc_etc'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/SDC_ETC');
            ref.set(buildCryptoRate(data))
        });
    });
}, 2000);


function buildCryptoRate(data){
    var r = JSON.parse(data);
    return {
        rate: r['rate'] || 0,
        minerFee: r['minerFee'] || 0,
        limit: r['limit'] || 0,
        minimum: r['minimum'] || 0,
        maxLimit: r['maxLimit'] || 0
    }
}




/*
 * Shapeshift API
 * */

setInterval(function() {
    https.get({
        host: 'shapeshift.io',
        path: '/recenttx/50'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/latestTransactions/crypto');
            ref.set(JSON.parse(data))
        });
    });
}, 2000);