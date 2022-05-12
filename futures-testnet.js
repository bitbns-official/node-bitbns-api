const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 


// To reset balance to 50000 USDT in test account
bitbns.futuresRequestBalance({
	fund : 50000,
  	reset: 1
},function(error, data) {
	console.log(data);
});


// To add 50000 USDT balance to existing balance 
bitbns.futuresRequestBalance({
	fund : 50000,
  	reset: 0
},function(error, data) {
	console.log(data);
});


// Get all active futures market list
bitbns.futuresInstList({},function(error, data) {
	console.log(data);
});


// Get my wallet balance and other details
bitbns.futuresWalletBalance({},function(error, data) {
	console.log(data);
  // console.log(data.data.wallet[54]);
});


// Get max open allowed for an instrument_id - get inst_id from previous call
bitbns.futuresMaxOpenPos({
	inst_id : 8
},function(error, data) {
	console.log(data);
});



// // Update user leverage for an instrument
bitbns.futuresUpdateLeverage({
	inst_id : 8,
  	leverage : 7
},function(error, data) {
	console.log(data);
});


// // Get all open orders
bitbns.futuresOpenOrders({},function(error, data) {
	console.log(data);
});


// // // Get all open positions
bitbns.futuresOpenPositions({},function(error, data) {
	console.log(data);
});


// // Place an open order - LONG - OPEN
bitbns.futuresPlaceOpenOrder({
	inst_id : 8,
	rate: 50000,
	qnty: 0.1,
	posSide : 0
},function(error, data) {
	console.log(data);
});


// // Place an open order - SHORT - OPEN
bitbns.futuresPlaceOpenOrder({
	inst_id : 8,
  	rate: 70000,
  	qnty: 0.1,
  	posSide : 1
},function(error, data) {
	console.log(data);
});


// // Cancel an open order 
bitbns.futuresCancelOpenOrder({
	order_id : 572
},function(error, data) {
	console.log(data);
});


// // Place a close order - LONG - CLOSE
bitbns.futuresPlaceCloseOrder({
	inst_id : 8,
  	rate: 98000,
  	qnty: 0.1,
  	posSide : 0
},function(error, data) {
	console.log(data);
});


// // // Place a close order - SHORT - SHORT
bitbns.futuresPlaceCloseOrder({
	inst_id : 8,
  	rate: 60000,
  	qnty: 0.01,
  	posSide : 1
},function(error, data) {
	console.log(data);
});


// // Cancel a closed order 
bitbns.futuresCancelCloseOrder({
	order_id : 573
},function(error, data) {
	console.log(data);
});

// // socket use for Order Book
const coinName = 'IC15';
this.ioSocket.emit('switchRoom', `news_${coinName}PERP`);
this.ioSocket.on('connect_error', error => {
	console.log('connect_error', error);
});

this.ioSocket.on('news', response => {
	// typeof check datatype of response
	if (typeof response === 'string' && response.includes('type')) {
		try {
			// JSON.parse convert string to json
			const res = JSON.parse(response);
			// hasOwn check type present in msg or not
			if (res && typeof res.type === 'string')) {
				if (res.type === 'sellList') {
					// res - format String
					// {"type":"sellList","data":"[{\"rate\":59870.9909,\"btc\":0.012},{\"rate\":63090.9139,\"btc\":0.1021}]"}
				}
				if (res.type === 'buyList') {
					// res - format String
					// {"type":"buyList","data":"[{\"rate\":40000,\"btc\":0.1566},{\"rate\":36000,\"btc\":1},{\"rate\":35000,\"btc\":4440.4593},{\"rate\":28000,\"btc\":1}]"}
				}

				if (res.type === 'tradeList') {
					// res - format String
					// {"type":"tradeList","data":[{"btc":0.5061,"rate":59679.5212,"time":"2022-05-11T10:23:09.000Z"}]}
				}
			}
		} catch (err) {
			console.log('trades:', err);
		}
	}
});
