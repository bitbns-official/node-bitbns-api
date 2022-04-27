const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 



// To register a new identity with Bitbns system
// Can add upto 3 names for user as per in different sending banks
// Mandatory fields -  name1 and identifier 
bitbns.registerClientIdentity({
	name1 : 'Test User',
  name2 : 'T User',
  name3 : 'Test U',
  identifier : 'HDUIEHIEJOIDEJDEOIOERNDKR' // max 45 characters
},function(error, data) {
	console.log(data);
});


// To add bank details of an identity with Bitbns system
// Mandatory fields -  all of them 
bitbns.addClientBankDetails({
	account_no : '64872364928349838',
  ifsc : 'HDFC0000017',
  identifier : 'HDUIEHIEJOIDEJDEOIOERNDKR' // max 45 characters
},function(error, data) {
	console.log(data);
});



// To remove bank details of an identity with Bitbns system
// Mandatory fields -  all of them 
bitbns.removeClientBankDetails({
	account_no : '64872364928349838',
  ifsc : 'HDFC0000017',
  identifier : 'HDUIEHIEJOIDEJDEOIOERNDKR' // max 45 characters
},function(error, data) {
	console.log(data);
});


// To fetch all submitted details of an identity with Bitbns system
// Mandatory fields -  identifier 
bitbns.fetchAllClientDetails({
  identifier : 'HDUIEHIEJOIDEJDEOIOERNDKR' // max 45 characters
},function(error, data) {
	console.log(data);
});

