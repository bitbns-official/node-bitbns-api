/* 

STEPS TO FOLLOW FOR USING BITBNS CRYPTO PAYMENT WEBHOOK

1. Get approval from Bitbns dev team for using Payment webhook and generate your merchant_id and merchant_secret
2. Once a payment is rec, we trigger a webhook to already submitted webhook point
3. Following fields will be there in the webhook payload - description, amount, upi_id, merchant_id, reference_number, user_identifier, signature, ack_type 
5. Verify signature by calculating it yourself with secret shared in step 1

let stringToEncode = "description=" + (description) + "&upi_id=" + upi_id + "&amount=" + amount + "&merchant_id=" + merchant_id + "&reference_number=" + reference_number + "&user_identifier=" + user_identifier + "&ack_type=" + ack_type;
const calculatedSignature = crypto.createHmac('sha256', apiSecret).update(stringToEncode).digest('hex');

POSSIBLE VALUES OF ack_type {PAYMENT_REC, PAYMENT_MAPPED}

6. You can accept the payment/credit in case calculatedSignature is matching to signature passed in the payload



*/
