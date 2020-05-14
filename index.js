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
    this.baseURL2 = "https://api.bitbns.com/api/trade/v2"
    this.apiKeys = {};
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

  getOrderBookSocket(coinName, marketName) {
		return socket_IO(`https://ws${marketName.toLowerCase()}m.bitbns.com/?coin=${coinName.toUpperCase()}`);
  }
  
  getExecutedOrders(token) {
		return socket_IO(`https://wsorder.bitbns.com/?token=${token}`);
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

  requestAuthenticate(symbol, callback){
    if(typeof(symbol) !== 'string' || symbol.length < 1) throw Error('Prices apiError :: Symbol not found.');
    if(typeof(callback) !== 'function') throw Error('Prices apiError :: Callback not found.');
  }

  requestAuthenticate2(orders_obj, callback) {
    if(typeof(orders_obj.symbol) !== 'string' || typeof(orders_obj.side) != 'string') throw Error('Invalid Object Passed');
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

}

module.exports = bitbnsApi;
