const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 

////// Place limit order on swap

////// type 0 - BUY. type 1 - SELL

bitbns.swapLimitINR({
	coin : 'BTC',
	quantity : '0.00001',
	rate : '3850000',
	type : 0
},function(error, data) {
	console.log(data)
});




////// Place limit order in USDT market on swap

////// type 0 - BUY. type 1 - SELL

bitbns.swapLimitUSDT({
	coin : 'BTC',
	quantity : '0.00001',
	rate : '45000',
	type : 0
},function(error, data) {
	console.log(data)
});




////// Cancel limit order swap

////// market 0 - INR market. market 1 - USDT market

bitbns.swapCancelOrder({ 
	order_id : '628919',
	market : '1'
},function(error, data) {
	console.log(data)
});


////// List swap Open Orders


bitbns.swapListOpenOrders({ 
	page : '0'
},function(error, data) {
	console.log(data)
});



////// Place market order on swap with quantity passed

////// type 0 - BUY. type 1 - SELL

bitbns.swapMarketINR({
	coin : 'BTC',
	quantity : '0.00001',
	type : 0
},function(error, data) {
	console.log(data)
});



////// Place market order on swap with volume in INR passed

////// type 0 - BUY. type 1 - SELL

bitbns.swapMarketINR({ 
	coin : 'BTC',
	volume : '100',
	type : 0
},function(error, data) {
	console.log(data)
});
 



////// Place limit order in USDT with quantity market on swap

////// type 0 - BUY. type 1 - SELL

bitbns.swapMarketUSDT({
	coin : 'BTC',
	quantity : '0.00001',
	type : 0
},function(error, data) {
	console.log(data)
});



////// Place limit order in USDT with volume market on swap

////// type 0 - BUY. type 1 - SELL

bitbns.swapMarketUSDT({ 
	coin : 'BTC',
	volume : 10,
	type : 0
},function(error, data) {
	console.log(data)
});




////// List Executed orders History


bitbns.swapOrderHistory({ 
	page : '0'
},function(error, data) {
	console.log(data)
});


////// All supported coins on swap


bitbns.swapCoinList({ 
},function(error, data) {
	console.log(data)
});