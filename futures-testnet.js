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

