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
}, 10000);






var activeCoins = [
    'BTC', 'ETH', 'DASH', 'XMR', 'ETC', 'REP',
    'ZEC', 'STEEM', 'FCT', 'DGD', 'SDC', 'NVC'
];


/*
 * CoinMarketCap API
 * */
setInterval(function() {
    https.get({
        host: 'api.coinmarketcap.com',
        path: '/v1/ticker/'
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            try {
                var res = JSON.parse(data);
                for(var i = 0; i < res.length; i++){
                    if(activeCoins.indexOf(res[i].symbol) != -1){
                        var ref = rootRef.child('marketReference/cryptoReference/' + res[i].symbol);
                        ref.set(buildCryptoReference(res[i]));
                    }
                }
            } catch (e) {
                return console.error(e);
            }

        });
    });
}, 10000);



function buildCryptoReference(data){
    return {
        price: data['price_usd'] || 0,
        volume_24h: data['24h_volume_usd'] || 0,
        marketCapital: data['market_cap_usd'] || 0,
        supply: data['available_supply'] || 0,
        change_1h: data['percent_change_1h'] || 0,
        change_24h: data['percent_change_24h'] || 0,
        change_7d: data['percent_change_7d'] || 0
    }
}

/*
 * Shapeshift API
 * */

setInterval(function() {
    var selectedCoin = '';
    var pairCoin = '';
    for(var i = 0; i < activeCoins.length; i++){
        selectedCoin = activeCoins[i];
        for(var x = 0; x < activeCoins.length; x++){
            pairCoin = activeCoins[x];
            if(selectedCoin != pairCoin){
                try {
                    setCryptoRate(selectedCoin + '_' + pairCoin);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}, 30000);


function setCryptoRate(pair){
    https.get({
        host: 'shapeshift.io',
        path: '/marketInfo/' + pair
    }, function(response) {
        var data = '';
        response.on('data', function(d) {
            data += d;
        });
        response.on('end', function() {
            var ref = rootRef.child('marketReference/cryptoExchange/' + pair);
            try {
                ref.set(buildCryptoRate(data))
            } catch (e) {
                return console.log(e);
            }
        });
    });
};



function buildCryptoRate(data){
    try {
        var r = JSON.parse(data);
        return {
            rate: r['rate'] || null,
            minerFee: r['minerFee'] || null,
            limit: r['limit'] || null,
            minimum: r['minimum'] || null,
            maxLimit: r['maxLimit'] || null
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

/*
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

*/





/*
 * Latest Transactions API
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