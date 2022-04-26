const crypto = require("crypto");
const request = require('request');
const socket_IO = require('socket.io-client');

const api_headers = {
  'X-BITBNS-APIKEY':'',
  'X-BITBNS-PAYLOAD': '',
  'X-BITBNS-SIGNATURE': '',
  'Accept': 'application/json',
  'Accept-Charset': 'utf-8',
  'content-type' : 'application/x-www-form-urlencoded',
};

class bitbnsApi{

  constructor(data){

    this.baseURL = "https://api.bitbns.com/api/trade/v1";
    this.baseURL2 = "https://api.bitbns.com/api/trade/v2";
    this.baseURL3 = "https://bitbns.com";
    this.apiKeys = {
      apiKey: '',
      apiSecretKey: ''
    };

    if (data){
      if(typeof(data.apiKey) !== 'string') throw Error('API_KEY NOT FOUND.');
      if(typeof(data.apiSecretKey) !== 'string') throw Error('API_SECRET_KEY NOT FOUND.');
      if(data.apiKey.length < 5) throw Error('API_KEY IS NOT OF VALID SIZE.');
      if(data.apiSecretKey.length < 5) throw Error('API_SECRET_KEY IS NOT OF VALID SIZE.');
      if(typeof data === 'object')
        {
          this.apiKeys = data;
        }
      else {
        throw Error('Data Format is incorrect.');
      }
    }
  }


  getOrderBookSocket(coinName, marketName) {
		return socket_IO(`https://ws${marketName.toLowerCase()}mv2.bitbns.com/?coin=${coinName.toUpperCase()}`, {transports: ['websocket']});
  }

  getTickerSocket(marketName) {
		return socket_IO(`https://ws${marketName.toLowerCase()}mv2.bitbns.com/?withTicker=true&onlyTicker=true`, {transports: ['websocket']});
  }

  getExecutedOrders(token) {
		return socket_IO(`https://wsorderv2.bitbns.com/?token=${token}`);
	}

  verifyApiKeys(data){
    if(typeof(data.apiKey) === 'string' && data.apiKey.length >= 5 && typeof(data.apiSecretKey) === 'string' && data.apiSecretKey.length >= 5){
      return true;
    }else{
      return false;
    }
  }
  getPayload(symbol, body){
    const timeStamp_nonce = Date.now().toString();
    const data = {
      symbol : symbol,
      timeStamp_nonce : timeStamp_nonce,
      body: body
    };
    return new Buffer(JSON.stringify(data)).toString('base64');
  }
  getSignature(payload, apiSecretKey){
    return crypto.createHmac('sha512',apiSecretKey)
                            .update(payload)
                            .digest('hex');
  }

  populateHeadersForPost(symbol, methodName, body){
    let headers = api_headers;
    let payload = this.getPayload(`/${methodName}/${symbol}`, body);
    let signature = this.getSignature(payload, this.apiKeys.apiSecretKey);
    headers['X-BITBNS-APIKEY'] = this.apiKeys.apiKey;
    headers['X-BITBNS-PAYLOAD'] = payload;
    headers['X-BITBNS-SIGNATURE'] = signature;
    return headers;
  }

  makePostRequest(symbol, methodName, body, callback){
    const options = {
      url : this.baseURL+'/'+methodName+'/'+symbol,
      method : 'POST',
      body : JSON.stringify(body)
    }
    let headers = this.populateHeadersForPost(symbol, methodName, JSON.stringify(body));
    options.headers = headers;
    request(options, function(error, res, body){
      if(!error){
        try {
          body = JSON.parse(body);
          return callback("",body);
        } catch(err){
          return callback("Invalid Non-JSON response " + methodName,"");
        }
      }else{
        return callback(error,"");
      }
    });
  }



  makePostRequest2(methodName, body, callback) {
    const options = {
      url : `${this.baseURL2}/${methodName}`,
      method : 'POST',
      body : JSON.stringify(body),
      followAllRedirects : true
    }


    let headers = this.populateHeadersForPost(body.symbol, methodName, JSON.stringify(body));
        options.headers = headers;
          request(options, function(error, res, body){
            if(!error){
              body = body
             // body = JSON.parse(body);
              return callback("",body);
            }else{
              return callback(error,"");
            }
          });


  }


  makePostRequest3(methodName, body, callback){
    const options = {
      url : this.baseURL+'/'+methodName+'/',
      method : 'POST',
      body : JSON.stringify(body)
    }
    let headers = this.populateHeadersForPost('ALL', methodName, JSON.stringify(body));
    options.headers = headers;
    request(options, function(error, res, body){
      if(!error){
        try {
          // console.log(body);
          body = JSON.parse(body);
          return callback("",body);
        } catch(err){
          return callback("Invalid Non-JSON response " + methodName , "");
        }
      }else{
        return callback(error,"");
      }
    });
  }

  requestAuthenticate(symbol, callback){
    if(typeof(symbol) !== 'string' || symbol.length < 1) throw Error('Prices apiError :: Symbol not found.');
    if(typeof(callback) !== 'function') throw Error('Prices apiError :: Callback not found.');
  }

  requestAuthenticate2(orders_obj, callback) {
    if(typeof(orders_obj.symbol) !== 'string' || typeof(orders_obj.side) != 'string') throw Error('Invalid Object Passed');
    if(typeof(callback) !== 'function') throw Error('Prices apiError :: Callback not found.');
  }

  requestAuthenticate3(callback) {
    // if(typeof(orders_obj.symbol) !== 'string' || typeof(orders_obj.side) != 'string') throw Error('Invalid Object Passed');
    if(typeof(callback) !== 'function') throw Error('Prices apiError :: Callback not found.');
  }

  /*
    Gives a list of open orders for a particular coin
    @params {string} symbol -> name of coin
    @params {string} user_id -> the user id of user whose data is to retrieved
    @return {function} -> function will return either body or error
  */

  listOpenOrders(symbol, callback){
    this.requestAuthenticate(symbol, callback);

    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:0};
      this.makePostRequest(symbol, "listOpenOrders", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }


  listExecutedOrders(symbol, pageNo, since, callback){
    this.requestAuthenticate(symbol, callback);

    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:pageNo, since:since};
      this.makePostRequest(symbol, "listExecutedOrders", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  listOpenStopOrders(symbol, callback){
    this.requestAuthenticate(symbol, callback);

    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:0};
      this.makePostRequest(symbol, "listOpenStopOrders", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  currentCoinBalance(symbol, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {};
      this.makePostRequest(symbol, "currentCoinBalance", body, callback);
    } else {
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }



  /*
    Places buy order for a particular coin
    @params {string} symbol -> name of coin
    @params {string} user_id -> the user id of user whose data is to retrieved
    @params {integer} quantity -> the amount of coin to buy
    @params {integer} rate -> the rate at which to buy
    @return {function} -> function will return either body or error
  */

  placeBuyOrder(symbol, quantity, rate, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate};
      this.makePostRequest(symbol, "placeBuyOrder", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  depositHistory(symbol, page, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:page};
      this.makePostRequest(symbol, "depositHistory", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  placeMarketOrder(symbol, market, side, amount, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {market:market,side:side,amount:amount};
      this.makePostRequest(symbol, "placeMarketOrder", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }
	
 placeMarketOrderQnty(symbol, market, side, quantity, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {market:market,side:side,quantity:quantity};
      this.makePostRequest(symbol, "placeMarketOrderQnty", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  buyStopLoss(symbol, quantity, rate, t_rate, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate,t_rate:t_rate};
      this.makePostRequest(symbol, "buyStopLoss", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  sellStopLoss(symbol, quantity, rate, t_rate, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate,t_rate:t_rate};
      this.makePostRequest(symbol, "sellStopLoss", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  buyStopLossWithTrail(symbol, quantity, rate, t_rate, trail, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate,t_rate:t_rate,trail:trail};
      this.makePostRequest(symbol, "buyStopLoss", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  sellStopLossWithTrail(symbol, quantity, rate, t_rate, trail, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate,t_rate:t_rate,trail:trail};
      this.makePostRequest(symbol, "sellStopLoss", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  getCoinAddress(symbol, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {};
      this.makePostRequest(symbol, "getCoinAddress", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  withdrawHistory(symbol, page, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:page};
      this.makePostRequest(symbol, "withdrawHistory", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  withdrawHistoryAll(page, callback){
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:page};
      let symbol = '';
      this.makePostRequest(symbol, "withdrawHistoryAll", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  depositHistoryAll(page, callback){
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {page:page};
      let symbol = '';
      this.makePostRequest(symbol, "depositHistoryAll", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  /*
    Places sell order for a particular coin
    @params {string} symbol -> name of coin
    @params {string} user_id -> the user id of user whose data is to retrieved
    @params {integer} quantity -> the amount of coin to buy
    @params {integer} rate -> the rate at which to buy
    @return {function} -> function will return either body or error
  */
  placeSellOrder(symbol, quantity, rate, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {quantity:quantity,rate:rate};
      this.makePostRequest(symbol, "placeSellOrder", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

   placeOrders(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("orders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
        }
   }

   getOrders(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("getordersnew", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
        }
   }

   cancelOrders(orders_obj, callback) {
      this.requestAuthenticate2(orders_obj, callback);
      if(this.verifyApiKeys(this.apiKeys)) {
          let body = orders_obj;
          this.makePostRequest2("cancel", body, callback);
      } else {
        return callback("apiKeys Not Found, Please intialize it first","")
      }
   }

  /*
    Cancels an open buy or sell order
    @params {string} symbol -> name of coin
    @params {string} user_id -> the user id of user whose data is to retrieved
    @params {integer} entry_id -> the id of the of the user
    @return {function} -> function will return either body or error
  */

  cancelOrder(symbol, entry_id, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {entry_id:entry_id};
      this.makePostRequest(symbol, "cancelOrder", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  orderStatus(symbol, entry_id, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {entry_id:entry_id};
      this.makePostRequest(symbol, "orderStatus", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  stopOrderStatus(symbol, entry_id, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {entry_id:entry_id};
      this.makePostRequest(symbol, "stopOrderStatus", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  bracketOrderStatus(symbol, entry_id, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {entry_id:entry_id};
      this.makePostRequest(symbol, "bracketOrderStatus", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  cancelStopLossOrder(symbol, entry_id, callback){
    this.requestAuthenticate(symbol, callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {entry_id:entry_id};
      this.makePostRequest(symbol, "cancelStopLossOrder", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

    getApiUsageStatus(callback){
    this.requestAuthenticate('USAGE', callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {};
      this.makePostRequest('USAGE', "getApiUsageStatus", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  getTokenSocket(callback){
    this.requestAuthenticate('USAGE', callback);
    if(this.verifyApiKeys(this.apiKeys)){
      let body = {};
      this.makePostRequest('USAGE', "getOrderSocketToken", body, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }


  /*
    Set Option for get / post requests
    @params {string} method -> type of request
    @params {string} route -> endpoint api
    @params {object} headers -> headers to set during POST request
    @params {object} body -> required methods parameters
    @return {object} -> options used for request
  */
  setOption(method, route, headers = {}, body = {}){
    let options =  {
      url : this.baseURL+route,
      method : method,
      headers :  headers,
      body : JSON.stringify(body)
    };
    return options;
  }

  setGetOption(method, route, headers = {}, body = {}){
    let options =  {
      url : route,
      method : method,
      headers :  headers,
      body : JSON.stringify(body)
    };
    return options;
  }
  /*
    Get the current status of the platform
    @return {object} -> whether the paltform is up for down for each coin present
  */
  platformStatus(callback){
    let options = this.setOption('GET','/platform/status',{'X-BITBNS-APIKEY':this.apiKeys.apiKey});
    request(options,function(error, response, body){
      if(!error && response.statusCode == 200){
        body = JSON.parse(body);
        return callback(error, body);
      } else {
        return callback(error, body);
      }
    })
  }


  /*
    Get the result from ticker api of a list of coins
    @return {object} -> ticker api results for each of the coins
  */
  getTickerApi(symbols, callback){
    let options = this.setOption('GET','/tickers',{'X-BITBNS-APIKEY':this.apiKeys.apiKey});
    request(options,function(error, response, body){
      if(!error && response.statusCode == 200){
        let symbolArray = symbols.split(',');
        let completeList = JSON.parse(body);
        Object.keys(completeList).forEach(function(key){
          completeList[key] = {
            "highest_buy_bid":completeList[key].highest_buy_bid,
            "lowest_sell_bid":completeList[key].lowest_sell_bid,
            "last_traded_price":completeList[key].last_traded_price
          }
        })
        let filteredList = {}; let errorFlag = 200;
        if(symbolArray.length === 1 && symbolArray[0] === ""){
          return callback(error,{"data":completeList,"status":1,"error":null,"code":200});
        }
        symbolArray.forEach((entity) => {
	  if(!completeList[entity]){
		 errorFlag = 403;
	  }
          filteredList[entity] = completeList[entity];
        })
        return callback(error, {"data":filteredList,"status":1,"error":null,"code":errorFlag});
      } else {
        return callback(error, {"data":body,"status":1,"error":null,"code":200});
      }
    })
  }

  /*
    @params  coin_name -> Name of coin for which we want to get list of buy orders
    @function callback -> this function will return error or data body
  */
  getBuyOrderBook(coin_name, callback){
    let options = this.setOption('GET',`/orderbook/buy/${coin_name}`,{'X-BITBNS-APIKEY':this.apiKeys.apiKey});
    request(options, function(error, response, body){
      if(!error && response.statusCode == 200){
        body = JSON.parse(body);
        return callback("", body);
      }else{
        return callback(error, body)
      }
    });
  }

  /*
    @params  coin_name -> Name of coin for which we want to get list of sell orders
    @function callback -> this function will return error or data body
  */
  getSellOrderBook(coin_name, callback){
    let options = this.setOption('GET',`/orderbook/sell/${coin_name}`,{'X-BITBNS-APIKEY':this.apiKeys.apiKey});
    request(options, function(error, response, body){
      if(!error && response.statusCode == 200){
        body = JSON.parse(body);
        return callback("", body);
      }else{
        return callback(error, body)
      }
    });
  }

  getOHLCData(coin_name, market, page, callback){
    coin_name = coin_name + '_'+ market;
    let options = this.setGetOption('GET',`https://bitbns.com/exchangeData/ohlc/?coin=${coin_name}&page=${page}`,{'X-BITBNS-APIKEY':this.apiKeys.apiKey});
    request(options, function(error, response, body){
      if(!error && response.statusCode == 200){
        body = JSON.parse(body);
        return callback("", body[0]);
      }else{
        return callback(error, body)
      }
    });
  }

// Margin Trading starts here - V2

placeMarginOrders(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}

cancelMarginOrder(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}

settleMarginPartial(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}

settleMargin(orders_obj, callback) {
  this.requestAuthenticate2(orders_obj, callback);
      if(this.verifyApiKeys(this.apiKeys)){
        let body = orders_obj;
        this.makePostRequest2("marginOrders", body, callback);
      }else{
        return callback("apiKeys Not Found , Please intialize it first","");
  }
}

listMarginExecuted(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}


listMarginPending(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}


listMarginMarketOrders(orders_obj, callback) {
    this.requestAuthenticate2(orders_obj, callback);
        if(this.verifyApiKeys(this.apiKeys)){
          let body = orders_obj;
          this.makePostRequest2("marginOrders", body, callback);
        }else{
          return callback("apiKeys Not Found , Please intialize it first","");
    }
}

fetchTickers(callback){
  const options = {
    url: this.baseURL3 + '/order/getTickerWithVolume',
    method: 'GET'
  }

  request(options, function(error, res, body) {
    if(!error){
      try{
        return callback("", JSON.parse(body));
      }catch(err){
        return callback("Parsing error : fetchTickers", "");
      }
    }else{
      return callback("Error in fetching tickers");
    }
  });
}

fetchOrderBook(coinName, marketName, depth, callback){
  const options = {
    url: this.baseURL3 + '/exchangeData/orderBook',
    method: 'GET',
    qs: {
      market: marketName,
      coin: coinName
    }
  };

  request(options, function(error, res, body){
    if(!error){
      try{
        body = JSON.parse(body);
        body['asks'].splice(depth);
        body['bids'].splice(depth);
        return callback("", {data: body, error: null, status: 1});
      }catch(err){
        return callback("Parsing error : fetchOrderBook", "");
      }
    }else{
      return callback("Error in fetching order book", "");
    }
  });
}

fetchTrades(coinName, marketName, limit, callback){
  const options = {
    url: this.baseURL3 + '/exchangeData/tradedetails',
    method: 'GET',
    qs: {
      market: marketName,
      coin: coinName
    }
  };

  request(options, function(error, res, body){
    if(!error){
      try{
        body = JSON.parse(body).reverse();
        return callback("",{data: body.splice(0, limit), error: null, status: 1});
      }catch(err){
        return callback("Parsing error : fetchTrades", "");
      }
    }else{
      return callback("Error in fetching trade details", "");
    }
  });

}

fetchOhlcv(coinName, marketName, page, callback){
  const options = {
    url: this.baseURL3 + '/exchangeData/ohlc',
    method: 'GET',
    qs: {
      coin: `${coinName}_${marketName}`,
      page: page
    }
  };

  request(options, function(error, res, body){
    if(!error){
      try{
        body = JSON.parse(body);
        return callback("", {data: body[0]['data'], error: null, status: 1});
      }catch(err){
        return callback("Parsing error : fetchOhlcv", "");
      }
    }else{
      return callback("Error in fetching ohlcv data", "");
    }
  });
}


// Swap APIS start here - Users can use these to place orders on Bitbns Swap 

swapLimitINR(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapLimitINR", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapLimitUSDT(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapLimitUSDT", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapCancelOrder(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapCancelOrder", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapListOpenOrders(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapListOpenOrders", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapMarketINR(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapMarketINR", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapMarketUSDT(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapMarketUSDT", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapOrderHistory(dataObj, callback){  
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapOrderHistory", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

swapCoinList(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("swapCoinList", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

// FIP APIs starts here 

listAllFIP(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("listAllFIP", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}


enrollForFIP(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("enrollForFIP", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

getOngoingFIP(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("getOngoingFIP", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

getFIPTransactions(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("getFIPTransactions", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

preSubscribeForFIP(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("preSubscribeForFIP", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

fetchMySubscriptions(dataObj, callback){ 
  this.requestAuthenticate3(callback);

  if(this.verifyApiKeys(this.apiKeys)){
    this.makePostRequest3("fetchMySubscriptions", dataObj, callback);
  }else{
    return callback("apiKeys Not Found , Please intialize it first","");
  }
}

// FIP APIs ends here


// Partner APIS start here - These apis need pre approval from Bitbns team


  createNewAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("createNewAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  updateUserAccountDetails(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("updateUserAccountDetails", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  fetchUserAccountDetails(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("fetchUserAccountDetails", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  transferToPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferToPoolAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  transferUSDTFromPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferUSDTFromPoolAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  transferCoinFromPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferCoinFromPoolAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  requestCoinWithdrawFromPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);
    
    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferCoinFromPoolToNormalAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  transferCoinToPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferCoinToPoolAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  transferINRFromPoolAccount(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("transferINRFromPoolAccount", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  generateNewAPIKey(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("generateNewAPIKey", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  createNewPGOrder(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("createNewPGOrder", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  fetchPGOrderStatus(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("fetchPGOrderStatus", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  /// Futures testnet apis start here

  futuresPlaceOpenOrder(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresPlaceOpenOrder", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresPlaceCloseOrder(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresPlaceCloseOrder", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresCancelOpenOrder(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresCancelOpenOrder", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresCancelCloseOrder(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresCancelCloseOrder", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresOpenPositions(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresOpenPositions", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresOpenOrders(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresOpenOrders", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresOrderHistory(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresOrderHistory", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresUpdateLeverage(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresUpdateLeverage", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresWalletBalance(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresWalletBalance", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresRequestBalance(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresRequestBalance", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresMaxOpenPos(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresMaxOpenPos", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

  futuresInstList(dataObj, callback){ 
    this.requestAuthenticate3(callback);

    if(this.verifyApiKeys(this.apiKeys)){
      this.makePostRequest3("futuresInstList", dataObj, callback);
    }else{
      return callback("apiKeys Not Found , Please intialize it first","");
    }
  }

}

module.exports = bitbnsApi;
