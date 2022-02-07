const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 



////// Find out list of all FIP

////// status (ENUM) - COMPLETE/ONGOING/UPCOMING/DISTRIBUTED

/// COMPLETE - allocation complete, ONGOING - ongoing allocations, UPCOMING - About to start FIP, DISTRIBUTED - Matured and balance redistributed

bitbns.listAllFIP({
	type : 'ONGOING'
},function(error, data) {
	console.log(data);
});


////// Enroll for a FIP

bitbns.enrollForFIP({
	fip_id : 441,
      amt: 500
},function(error, data) {
	console.log(data);
});


////// Get all investments so far in FIP (Returns last 100) - can be called with or without fip_id

bitbns.getFIPTransactions({
	fip_id : 441
},function(error, data) {
	console.log(data);
});


bitbns.getFIPTransactions({
},function(error, data) {
	console.log(data); 
});



////// Get all my ongoing investments (FIPs - last 100)


bitbns.getOngoingFIP({
},function(error, data) {
	console.log(data); 
      console.log(data.data[0].fip_details); 
});


////// Pre subscribe for FIP (Balance is locked only during FIP enrolment)


bitbns.preSubscribeForFIP({
      fip_id : 452,
      amt: 500
},function(error, data) {
	console.log(data); 
      console.log(data.data[0].fip_details); 
});


////// Fetch my pre subscription list 


bitbns.fetchMySubscriptions({
},function(error, data) {
	console.log(data); 
      console.log(data.data[0].fip_details); 
});