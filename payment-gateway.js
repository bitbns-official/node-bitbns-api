const bitbnsApi = require('./index');

const bitbns = new bitbnsApi({
      apiKey :  'your_public_key',
      apiSecretKey : 'your_private_key'
}); 

/* 

STEPS TO FOLLOW FOR USING BITBNS CRYPTO PAYMENT GATEWAY

1. Get approval from Bitbns dev team for using Payment gateway and generate your merchant_id and merchant_secret
2. Generate a payment request with your API keys using function below
3. Step 2 returns a payment URL, redirect user to that page
4. On success/failure , Bitbns will redirect to landing / callback page of your website with fields - status, msg, amount, coin, signature
5. Verify signature by calculating it yourself with secret shared in step 1

let stringToEncode = "status=" + (status) + "&msg=" + msg + "&amount=" + amount + "&coin=" + coin;
const calculatedSignature = crypto.createHmac('sha256', apiSecret).update(stringToEncode).digest('hex');

6. You can alternatively call/poll and fetch status of payment from fetchPGOrderStatus endpoint as well
7. Once you get success , amount has been credited to your pooled account from user

*/

////// Generate a new payment gateway request

 bitbns.createNewPGOrder({  
      merchant_id: 1,
      amt: 25, // Amt of coins to be deducted as fee
      coin: "USDT", // Coin to be used for payment - Any coin on Bitbns platform can be used
      refId: "ORDER_CLIENT123487134", // any unique client ref number 
      email: 'xyz@buyhatke.com' // Email of user
},function(error, data) {
	console.log(data);
    console.log(error);
});


////// Fetch Status of any payment with order id returned while creating payment request

 bitbns.fetchPGOrderStatus({  
      merchant_id: 2,
      order_id: 21, // Order id to fetch status
},function(error, data) {
	console.log(data);
    console.log(error);
});