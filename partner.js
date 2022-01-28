const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 


////// Creating a new account

bitbns.createNewAccount({
	email : 'test_bns34324@gmail.com',
	phone : '8676857590',
	pass : 'hd237ydkldl',
	dormant : 1,
    country: 0
},function(error, data) {
	console.log(data)
});


////// Adding PAN of user a new account

bitbns.updateUserAccountDetails({ 
	target_uid : 1705823,
	type : 'pan',
	id : 'DVZPS7302U',
	name : 'Prashant Singh',
    dob: '12-03-1992'
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Adding Aadhar of user

bitbns.updateUserAccountDetails({ 
	target_uid : 1705823,
	type : 'aadhar',
	id : '782379829288',
	name : 'Prashant Singh'
},function(error, data) {
	console.log(data);
    console.log(error);
});



////// Adding Bank details of user

bitbns.updateUserAccountDetails({ 
	target_uid : 1705823,
	type : 'bank',
	acc_id : '782373229829288',
	name : 'Prashant Singh',
	branch : 'Koramangala',
	bank_name : 'HDFC Bank',
	ifsc : 'HDFC00000017',
	mob : '8676857590',
	bank_type : 'Savings',
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Adding UPI id of user

bitbns.updateUserAccountDetails({ 
	target_uid : 1705823,
	type : 'upi',
	vpa : 'atiprashant@okhdfc'
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Mark all KYC uploaded

bitbns.updateUserAccountDetails({  
	target_uid : 1705823,
	type : 'kycUploaded'
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Fetch all KYC details and status of user

bitbns.fetchUserAccountDetails({  
	target_uid : 1705823
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Generate private key

bitbns.generateNewAPIKey({  
	target_uid : 1705823
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Transfer funds to pool account

bitbns.transferToPoolAccount({    
	pool_uid : 113064,
	amount : 50,
},function(error, data) { 
	console.log(data);
    console.log(error);  
});


//// Transfer funds to pool account

bitbns.transferToPoolAccount({    
	pool_uid : 64873278,
	amount : 50,
},function(error, data) { 
	console.log(data);
    console.log(error);   
});


//// Transfer USDT funds from pool account

bitbns.transferUSDTFromPoolAccount({    
	target_uid : 23342324,
	amount : 50,
},function(error, data) { 
	console.log(data);
    console.log(error);  
});

//// Transfer Any coin from pool account

bitbns.transferCoinFromPoolAccount({    
	target_uid : 23342324,
	amount : 1,
    coin: 460
},function(error, data) { 
	console.log(data);
    console.log(error);  
});

//// Transfer INR funds from pool account

bitbns.transferINRFromPoolAccount({    
	target_uid : 28746827,
	usdtAmt : 50,
	inrAmt : 4000,
   vpa: 'test@pingpay'
},function(error, data) { 
	console.log(data);
    console.log(error);  
});
