const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 


// Get trade history new

bitbns.fetchMyHistory({
	method : 'tradeHistory',
	coin_name : 'BTC',
	market : 'INR',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});


// Get INR deposit history new

bitbns.fetchMyHistory({
	method : 'depINRHistory',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});

// Get deposit crypto and airdrops history new

bitbns.fetchMyHistory({
	method : 'depCryptoHistory',
	coin_name : 'BTC',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});

// Get deposit crypto blockchain history new

bitbns.fetchMyHistory({
	method : 'depCryptoExternalHistory',
	coin_name : 'BTC',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});


// Get INR withdraw history new

bitbns.fetchMyHistory({
	method : 'withINRHistory',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});

// Get withdraw crypto and airdrops history new

bitbns.fetchMyHistory({
	method : 'withCryptoHistory',
	coin_name : 'BTC',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});

// Get withdraw crypto blockchain history new

bitbns.fetchMyHistory({
	method : 'withCryptoExternalHistory',
	coin_name : 'BTC',
      limit : '200',
      page: 0
}, function(error, data) {
	console.log(error, data);
});
