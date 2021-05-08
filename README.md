<p><a href="https://npmjs.org/package/bitbns" rel="nofollow"><img src="https://nodei.co/npm/bitbns.png?compact=true" alt="NPM|Bitbns" data-canonical-src="https://nodei.co/npm/bitbns.png?compact=true" style="max-width:100%;"></a></p>

# Bitbns Node API

This project is designed to assist you make your own projects that interact with the Bitbns API.  This project seeks to have complete API coverage.

<code><b>Use Node Version 8.1.0+</b></code><br><br>
<b><i>Download NodeJs Installer</i></b><br>
<h6><a href='https://nodejs.org/dist/v8.12.0/node-v8.12.0-x86.msi'>For Windows Users</a></h6>
<h6><a href='https://nodejs.org/dist/v8.12.0/node-v8.12.0.pkg'>For Mac Users</a></h6>
<h6><a href='#'>For Ubuntu Users</a> </h6>
<pre>
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install -y nodejs

    After the installation is completed, you can verify the version of Node.js installed:
    node -v
    v8.1.1
    You can also check the version of npm installed:
    npm -v
    5.0.3

Alternative Method :
<a href='https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04'>Click Here</a>

</pre>
<br>
<h6><a href='https://nodejs.org/en/download/'>For Other Platforms</a></h6>

<h2>API Access</h2>
<div id ="api_summary_table" style ="border:1px solid">
  <table style = "width:55%">
    <tr>
      <th>PERMISSIONS</th>
      <th>Read</th>
      <th>Write</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <th>List Open Orders</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>List Executed Orders</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>List Open Stop Limit</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Api Usages Status</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Current Coin Balance</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Deposit History</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Withdrawal History</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Order Status</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
    <tr>
      <th>Buy Stop Loss Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Sell Stop Loss Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Buy Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Sell Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Get Coin Address</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
     <tr>
      <th>Cancel Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Cancel Stop Loss Order</th>
      <th>&#x2716;</th>
      <th>&#10003;</th>
    </tr>
     <tr>
      <th>Platform Status</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
     <tr>
      <th>Ticker API</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
      <tr>
      <th>Buy OrderBook</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
      <tr>
      <th>Sell OrderBook</th>
      <th>&#10003;</th>
      <th>&#x2716;</th>
    </tr>
  </table>
</div><br>

<h2>Minimum Volume allowed of supporting currencies</h2>
<h2>Minimum Volume supported by exchange</h2>
<h3> <b> Minimum volume amount per order: </b></h3>

  - USDT market = <u>1 USDT</u>
  - INR market = <u>50 INR</u>

<h3>Installation</h3>
<code>npm install bitbns --save</code>

<h3>Getting Started</h3><br>
<pre>
const bitbnsApi = require('bitbns');
<code>
const bitbns = new bitbnsApi({
      apiKey :  'API-KEY',
      apiSecretKey : 'SECRET-KEY'
});
</code>
</pre>

<b>Instantiating Multiple Instances</b><br>
<pre>
const bitbnsApi = require('bitbns');

const instance1 = new bitbnsApi({
  // ...
});

const instance2 = new bitbnsApi({
  // ...
});
</pre>
<b>Getting Platform Status</b>
<pre>
bitbns.platformStatus(function(error, data){
  console.log(error, data);
});
</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  data: {
    BTC: {
      status: 1
    },
    ETH: {
      status: 1
    },
    XRP: {
      status: 1
    }
  },
  status: 1,
  error: null
}
Explanation of fields:
status -> whether the coin is live on platform
   </pre>
</details>
<b>Getting latest price of a symbol</b>
Inputting Invalid crypto name would return "undefined" as the price.
<pre>
bitbns.getTickerApi('BTC',function(error,data){
  console.log("BTC Price :: ",data);
})
</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": {
    "BTC": {
      "highest_buy_bid": 484159.43,
      "lowest_sell_bid": 494800,
      "last_traded_price": 494805.29
    }
  },
  "status": 1,
  "error": null
}
Explanation of fields:
highest_buy_bid -> top entry of buy order book
lowest_sell_bid -> top entry of sell order book
last_traded_price -> price at which the last trade had happened
   </pre>
</details>

<b>Getting latest price of few symbols</b>
<pre>
bitbns.getTickerApi('BTC,ETH',function(error,data){
  console.log("BTC Price :: ",data);
})
</pre>
<details>
 <summary>
    View Response
 </summary>
 <pre>
    {
  "data": {
    "BTC": {
      "highest_buy_bid": 484159.43,
      "lowest_sell_bid": 494800,
      "last_traded_price": 494805.29
    },
    "ETH": {
      "highest_buy_bid": 13205.01,
      "lowest_sell_bid": 13440,
      "last_traded_price": 13450
    }
  },
  "status": 1,
  "error": null
}

Explanation of fields:
highest_buy_bid -> top entry of buy order book
lowest_sell_bid -> top entry of sell order book
last_traded_price -> price at which the last trade had happened
 </pre>
</details>

<b>Getting latest price of all symbols</b>
<pre>
bitbns.getTickerApi('',function(error,data){
  console.log("All Price :: ",data);
})
</pre>

<details>
  <summary>
   View Response
  </summary>
<pre>
  {
  "data": {
    "BTC": {
      "highest_buy_bid": 480059.8,
      "lowest_sell_bid": 489000,
      "last_traded_price": 480059.8
    },
    "XRP": {
      "highest_buy_bid": 20,
      "lowest_sell_bid": 20.16,
      "last_traded_price": 20.16
    },
    "NEO": {
      "highest_buy_bid": 1301,
      "lowest_sell_bid": 1349.99,
      "last_traded_price": 1331.92
    },
    "GAS": {
      "highest_buy_bid": 406.96,
      "lowest_sell_bid": 418.46,
      "last_traded_price": 418.46
    },
    "ETH": {
      "highest_buy_bid": 13350,
      "lowest_sell_bid": 13660.5,
      "last_traded_price": 13350
    },
    "XLM": {
      "highest_buy_bid": 14.75,
      "lowest_sell_bid": 14.77,
      "last_traded_price": 14.77
    },
    "RPX": {
      "highest_buy_bid": 0.77,
      "lowest_sell_bid": 0.82,
      "last_traded_price": 0.8
    },
    "DBC": {
      "highest_buy_bid": 0.73,
      "lowest_sell_bid": 0.77,
      "last_traded_price": 0.72
    },
    "LTC": {
      "highest_buy_bid": 3680,
      "lowest_sell_bid": 3800,
      "last_traded_price": 3800
    },
    "XMR": {
      "highest_buy_bid": 7555,
      "lowest_sell_bid": 8000,
      "last_traded_price": 7600
    },
    "DASH": {
      "highest_buy_bid": 13500,
      "lowest_sell_bid": 14500,
      "last_traded_price": 13500
    },
    "DOGE": {
      "highest_buy_bid": 0.47,
      "lowest_sell_bid": 0.49,
      "last_traded_price": 0.49
    },
    "BCH": {
      "highest_buy_bid": 33600,
      "lowest_sell_bid": 34997,
      "last_traded_price": 34998
    },
    "SC": {
      "highest_buy_bid": 0.38,
      "lowest_sell_bid": 0.42,
      "last_traded_price": 0.42
    },
    "TRX": {
      "highest_buy_bid": 1.35,
      "lowest_sell_bid": 1.36,
      "last_traded_price": 1.35
    },
    "ETN": {
      "highest_buy_bid": 0.38,
      "lowest_sell_bid": 0.39,
      "last_traded_price": 0.39
    },
    "ONT": {
      "highest_buy_bid": 126.01,
      "lowest_sell_bid": 136.1,
      "last_traded_price": 136.82
    },
    "ZIL": {
      "highest_buy_bid": 2.37,
      "lowest_sell_bid": 2.5,
      "last_traded_price": 2.51
    },
    "EOS": {
      "highest_buy_bid": 365.51,
      "lowest_sell_bid": 375.1,
      "last_traded_price": 385
    },
    "POLY": {
      "highest_buy_bid": 10.01,
      "lowest_sell_bid": 10.04,
      "last_traded_price": 10.04
    },
    "DGB": {
      "highest_buy_bid": 1.6,
      "lowest_sell_bid": 1.83,
      "last_traded_price": 1.82
    },
    "NCASH": {
      "highest_buy_bid": 0.35,
      "lowest_sell_bid": 0.36,
      "last_traded_price": 0.36
    },
    "ADA": {
      "highest_buy_bid": 4.97,
      "lowest_sell_bid": 5.09,
      "last_traded_price": 4.92
    },
    "ICX": {
      "highest_buy_bid": 40.01,
      "lowest_sell_bid": 45.5,
      "last_traded_price": 40.25
    },
    "VEN": {
      "highest_buy_bid": 0.96,
      "lowest_sell_bid": 1.15,
      "last_traded_price": 1.15
    },
    "OMG": {
      "highest_buy_bid": 239.72,
      "lowest_sell_bid": 267.71,
      "last_traded_price": 267.71
    },
    "REQ": {
      "highest_buy_bid": 2.22,
      "lowest_sell_bid": 2.39,
      "last_traded_price": 2.3
    },
    "DGD": {
      "highest_buy_bid": 2385,
      "lowest_sell_bid": 3000,
      "last_traded_price": 2385
    },
    "QLC": {
      "highest_buy_bid": 3.3,
      "lowest_sell_bid": 3.96,
      "last_traded_price": 3.4
    },
    "POWR": {
      "highest_buy_bid": 10.02,
      "lowest_sell_bid": 11.4,
      "last_traded_price": 10.01
    },
    "WPR": {
      "highest_buy_bid": 1.18,
      "lowest_sell_bid": 1.25,
      "last_traded_price": 1.17
    },
    "WAVES": {
      "highest_buy_bid": 150.1,
      "lowest_sell_bid": 179,
      "last_traded_price": 150
    },
    "WAN": {
      "highest_buy_bid": 58.51,
      "lowest_sell_bid": 69.9,
      "last_traded_price": 53.55
    },
    "ACT": {
      "highest_buy_bid": 2.21,
      "lowest_sell_bid": 2.68,
      "last_traded_price": 2.21
    },
    "XEM": {
      "highest_buy_bid": 5.7,
      "lowest_sell_bid": 7.51,
      "last_traded_price": 10
    },
    "XVG": {
      "highest_buy_bid": 0.89,
      "lowest_sell_bid": 0.92,
      "last_traded_price": 0.88
    },
    "BLZ": {
      "highest_buy_bid": 7.61,
      "lowest_sell_bid": 7.8,
      "last_traded_price": 7.8
    },
    "SUB": {
      "highest_buy_bid": 7.06,
      "lowest_sell_bid": 8.5,
      "last_traded_price": 7.45
    },
    "LRC": {
      "highest_buy_bid": 6.5,
      "lowest_sell_bid": 9.95,
      "last_traded_price": 6.7
    },
    "NEXO": {
      "highest_buy_bid": 3.91,
      "lowest_sell_bid": 4.19,
      "last_traded_price": 3.91
    },
    "EFX": {
      "highest_buy_bid": 0.69,
      "lowest_sell_bid": 0.9,
      "last_traded_price": 0.7
    },
    "CPX": {
      "highest_buy_bid": 1.05,
      "lowest_sell_bid": 1.27,
      "last_traded_price": 1.05
    },
    "ZRX": {
      "highest_buy_bid": 38.09,
      "lowest_sell_bid": 39.49,
      "last_traded_price": 37.77
    },
    "REP": {
      "highest_buy_bid": 1050,
      "lowest_sell_bid": 1200,
      "last_traded_price": 1025
    },
    "LOOM": {
      "highest_buy_bid": 5.06,
      "lowest_sell_bid": 6.7,
      "last_traded_price": 6.7
    },
    "EOSD": {
      "highest_buy_bid": 3.51,
      "lowest_sell_bid": 3.88,
      "last_traded_price": 3.51
    },
    "STORM": {
      "highest_buy_bid": 0.47,
      "lowest_sell_bid": 0.5,
      "last_traded_price": 0.48
    },
    "GNT": {
      "highest_buy_bid": 9.25,
      "lowest_sell_bid": 9.26,
      "last_traded_price": 9.26
    },
    "QTUM": {
      "highest_buy_bid": 235,
      "lowest_sell_bid": 288.97,
      "last_traded_price": 247.69
    },
    "QKC": {
      "highest_buy_bid": 1.86,
      "lowest_sell_bid": 2.34,
      "last_traded_price": 1.76
    },
    "LSK": {
      "highest_buy_bid": 230,
      "lowest_sell_bid": 286,
      "last_traded_price": 230
    },
    "NPXS": {
      "highest_buy_bid": 0.11,
      "lowest_sell_bid": 0.12,
      "last_traded_price": 0.11
    },
    "USDT": {
      "highest_buy_bid": 74.12,
      "lowest_sell_bid": 77,
      "last_traded_price": 74.11
    },
    "ETC": {
      "highest_buy_bid": 804.02,
      "lowest_sell_bid": 850,
      "last_traded_price": 804
    },
    "DENT": {
      "highest_buy_bid": 0.15,
      "lowest_sell_bid": 0.17,
      "last_traded_price": 0.17
    },
    "CLOAK": {
      "highest_buy_bid": 120.51,
      "lowest_sell_bid": 159.92,
      "last_traded_price": 135
    },
    "KMD": {
      "highest_buy_bid": 70,
      "lowest_sell_bid": 77,
      "last_traded_price": 77.6
    },
    "GRS": {
      "highest_buy_bid": 35,
      "lowest_sell_bid": 39.4,
      "last_traded_price": 38.4
    },
    "RAM": {
      "highest_buy_bid": 0.38,
      "lowest_sell_bid": 0.4,
      "last_traded_price": 0.38
    },
    "LET": {
      "highest_buy_bid": 0.64,
      "lowest_sell_bid": 0.68,
      "last_traded_price": 0.68
    },
    "SOUL": {
      "highest_buy_bid": 2.26,
      "lowest_sell_bid": 2.71,
      "last_traded_price": 2.7
    },
    "PHX": {
      "highest_buy_bid": 0.77,
      "lowest_sell_bid": 0.82,
      "last_traded_price": 0.8
    },
    "VET": {
      "highest_buy_bid": 0.96,
      "lowest_sell_bid": 1.15,
      "last_traded_price": 1.15
    },
    "TST": {
      "highest_buy_bid": 23,
      "lowest_sell_bid": 27.5,
      "last_traded_price": 25
    }
  },
  "status": 1,
  "error": null
}
</pre>
</details>

<b>Getting current balance of crypto asset</b><br>
Inputing "INR" in place of crypto asset would list your inr balance . Pass "EVERYTHING" to get all the balance at once
<pre>
bitbns.currentCoinBalance('BTC', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": {
    "inorderBTC": 8.34,
    "availableorderBTC": 15.76
  },
  "status": 1,
  "error": null
}
Explanation of fields:
inorderBTC -> volume which is the order book
availableorderBTC -> volume which is present in wallet
  </pre>
</details>

<b>Get Deposit History</b><br>
<pre>
bitbns.depositHistory('BTC', 0, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>


<details>
  <summary>
   View Response
  </summary>
  <pre>
 {
  data: [
    {
      type: 'BTC deposited',
      typeI: 1,
      amount: 0.00159302,
      date: '2018-08-21T14:35:02.000Z',
      unit: 'BTC',
      factor: 100000000,
      fee: 0,
      delh_btc: 0,
      delh_inr: 0,
      rate: 0,
      del_btc: 159302,
      del_inr: 0
    },
    {
      type: 'BTC deposited',
      typeI: 1,
      amount: 0.00142951,
      date: '2018-08-21T14:35:02.000Z',
      unit: 'BTC',
      factor: 100000000,
      fee: 0,
      delh_btc: 0,
      delh_inr: 0,
      rate: 0,
      del_btc: 142951,
      del_inr: 0
    }
  ],
  status: 1,
  error: null
}

Explanation of fields:
type -> type of action
typeI -> action id
amount -> the amount deposited
date -> the time at which this event occured
unit -> the symbol name of coin
factor -> the division factor
del_btc -> delta changes in normal wallet of coin
del_inr -> delta changes in normal inr wallet
delh_btc -> delta changes in hold wallet of coin
  </pre>
</details>

<b>Get ALL Deposit History</b><br>
<pre>
bitbns.depositHistoryAll(0, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>

0 -> page no. (use pagination to fetch older deposit history)
<details>
  <summary>
   View Response
  </summary>
  <pre>
 {{
  data: [
    {
      type: 'USDT deposited',
      typeI: 2,
      date: '2021-01-01T07:32:06.000Z',
      unit: 'USDT',
      factor: 100,
      fee: 0,
      coin: 'USDT',
      amt: 120,
      id: 'WITH_DROPLET'
    },
	],
  status: 1,
  error: null,
  code: 200
}}

Explanation of fields:
type -> type of action
typeI -> action id
amt -> the amount deposited
date -> the time at which this event occured
unit -> the symbol name of coin
factor -> the division factor
id -> source of deposit
  </pre>
</details>

<b>Get Withdrawal History</b><br>
<pre>bitbns.withdrawHistory('XRP', 0, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
{
  data: [
    {
      type: 0,
      amount: 1.1,
      unit: 'XRP',
      hash: '42DAD88011C178DCAA1587ABA4458F4D535B30248650A6C353E5E2527',
      fee: 0.1,
      to: 'rB1za2ZVgqvrNB7u8LbVN61k5n1ByBUtXCA',
      status: '-1',
      canSendMail: 0,
      cancelable: -1,
      refer: 5339918,
      expTime: 'XRP withdraw done'
    },
    {
      type: 0,
      amount: 100,
      unit: 'XRP',
      hash: '12520219872260A25457E4D03C8F82F696A23EEA558B693B90FF080C5',
      fee: 0.1,
      to: 'rLdBnLq5C13ood9wdjY9ZCdgycK8KGevkUj',
      status: '-1',
      canSendMail: 0,
      cancelable: -1,
      refer: 6531933,
      expTime: 'XRP withdraw done'
    }
  ],
  status: 1,
  error: null
}
  </pre>
</details>

<b>Get ALL withdrawal History</b><br>
<pre>
bitbns.withdrawHistoryAll(0, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>

0 -> page no. (use pagination to fetch older deposit history)
<details>
  <summary>
   View Response
  </summary>
  <pre>
 {{
  data: [
    {
      type: 'USDT withdrawn',
      typeI: 2,
      date: '2021-01-01T07:32:06.000Z',
      unit: 'USDT',
      factor: 100,
      fee: 0,
      coin: 'USDT',
      amt: 120,
      id: 'WITH_DROPLET'
    },
	],
  status: 1,
  error: null,
  code: 200
}}

Explanation of fields:
type -> type of action
typeI -> action id
amt -> the amount deposited
date -> the time at which this event occured
unit -> the symbol name of coin
factor -> the division factor
id -> source of withdrawal
  </pre>
</details>

<b>List Open Orders</b><br>
<pre>
bitbns.listOpenOrders('BTC', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": [
    {
      "entry_id": 322,
      "btc": 48,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 323,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 324,
      "btc": 100,
      "r ate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 325,
      "btc": 100,
      "rate": 25,
      "time": "2018-0 9-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 326,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "t ype": 1,
      "status": 0
    },
    {
      "entry_id": 327,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "e ntry_id": 328,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 329,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 330,
      "btc": 100,
      "rate": 25,
      "time": "201 8-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 331,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 332,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 333,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 334,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:29:52.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 337,
      "btc": 100,
      "rate": 25,
      "time": " 2018-09-10T12:45:51.000Z",
      "type": 1,
      "status": 0
    },
    {
      "entry_id": 338,
      "btc": 100,
      "rate": 25,
      "time": "2018-09-10T12:46:01.00 0Z",
      "type": 1,
      "status": 0
    }
  ],
  "status": 1,
  "error": null
}

Explanation of fields:
entry_id -> the unique id assigned to the order
btc -> the volume of the coin
rate -> the rate at which the order was placed
time -> the timestamp at which the order was placed
type -> 1 for sell and 0 for buy order
status -> -1 for cancelled , 0 for not processed , 1 for partially executed, 2 for fully executed
  </pre>
</details>

<b>List Open Stop Loss Orders</b><br>
<pre>
bitbns.listOpenStopOrders('TST', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  data: [
    {
      entry_id: 28816,
      btc: 40,
      rate: 25,
      t_rate: 24.5,
      type: 1,
      status: 0
    }
  ],
  status: 1,
  error: null
}

Explanation of fields:
entry_id -> the unique id assigned to the order
btc -> the volume of the coin
rate -> the rate at which the order was placed
t_rate -> the trigger rate at which the order was placed
time -> the timestamp at which the order was placed
type -> 1 for sell and 0 for buy order
status -> -1 for cancelled , 0 for not processed , 1 for partially executed, 2 for fully executed
  </pre>
</details>


<b>Get Specific Crypto Coin Address</b><br>
<pre>
Coins Without Tag
bitbns.getCoinAddress('BTC', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
});</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
{
  "data": {
    "token": "3QkuWRDRNcjtMQNneoqFV7hpxQPWW6pupK",
    "expiry": "2018-09-12 13:04:09"
  },
  "status": 1,
  "error": null
}

Explanation of fields:
token -> the token address
expiry -> the time till which this address is user's valid address
  </pre>
</details>
<pre>
Coins With Tag
bitbns.getCoinAddress('XLM', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
});</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
{
  "data": {
    "token": "GAVQNY45FBHSN5MEPLAF56U7VDCBDG54TQFGJSS2CRPZTWD3CSHP4YPU",
    "tag": "123151"
  },
  "status": 1,
  "error": null
}

Explanation of fields:
token -> the token address
tag -> the tag to be used for the token
Deposits would not be valid unless you specify the tag
  </pre>
</details>

<b>Place Sell Order</b><br>
<pre>bitbns.placeSellOrder('XRP', 200, 25, function(error, data){
 if(!error){
    console.log('Data ::', data);
  } else {
    console.log('Error ::', error);
  }
})
200 -> Quantity
25 -> Rate
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  {
  "data": "Successfully placed bid to sell at specified price",
  "status": 1,
  "error": null,
  "id": 489
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>

<b>Place Buy Order</b><br>
<pre>bitbns.placeBuyOrder('XRP', 200, 25, function(error, data){
 if(!error){
    console.log('Data ::', data);
  } else {
    console.log('Error ::', error);
  }
})
200 -> Quantity
25 -> Rate
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  {
  "data": "Successfully placed bid to purchase currency",
  "status": 1,
  "error": null,
  "id": 490
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>
<b>Placing a STOP LOSS order (BUY)</b><br>
<pre>
bitbns.buyStopLoss('XRP', 40, 24, 24.5, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

40 -> Quantity
24 -> Rate
24.5 -> Trigger rate
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  {
  "data": "Successfully placed order for stop loss buy",
  "status": 1,
  "error": null,
  "id": 28595
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>

<b>Placing a Trailing STOP LOSS order (BUY)</b><br>
<pre>
bitbns.buyStopLossWithTrail('USDT', 15, 76, 77.5,0.5, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

15 -> Quantity
76 -> Rate
77.5 -> Trigger rate
0.5 -> trail value
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  {
  "data": "Successfully placed a stop limit buy order",
  "status": 1,
  "error": null,
  "id": 28595
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>



<b>Placing a STOP LOSS order (SELL)</b><br>
<pre>
bitbns.sellStopLoss('XRP', 40, 25, 24.5, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

40 -> Quantity
24 -> Rate
24.5 -> Trigger rate
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": "Successfully placed a stop limit sell order",
  "status": 1,
  "error": null,
  "id": 28596
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>

<b>Placing a Trailing STOP LOSS order (SELL)</b><br>
<pre>
bitbns.sellStopLossWithTrail('USDT', 15, 80, 78.5,0.5, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

15 -> Quantity
80 -> Rate
78.5 -> Trigger rate
0.5 -> trail value
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  {
  "data": "Successfully placed a stop limit sell order",
  "status": 1,
  "error": null,
  "id": 28595
}

Explanation of fields:
data -> Just a custom message
id -> the unique id of the order
  </pre>
</details>


<b>Place Cancel Order</b><br>
<pre>bitbns.cancelOrder('XRP', 174 , function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
Here 174 is a order id
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": "Successfully cancelled the order",
  "status": 1,
  "error": null
}

Explanation of fields:
data -> just a custom message
status -> status of cancellation 1 for success
  </pre>
</details>

<b>Getting Sell Order Book</b><br>
<pre>
bitbns.getSellOrderBook('BTC', function(e, d){
console.log(e,d);
});
</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  data: [
    {
      rate: 481847.56,
      btc: 6352679
    },
    {
      rate: 481700,
      btc: 5540000
    },
    {
      rate: 481551,
      btc: 5000000
    },
    {
      rate: 481000,
      btc: 11406
    },
    {
      rate: 480000,
      btc: 208021
    },
    {
      rate: 479366.65,
      btc: 5265026
    },
    {
      rate: 479345,
      btc: 453445
    },
    {
      rate: 478854.18,
      btc: 642042
    },
    {
      rate: 478749.87,
      btc: 208356
    },
    {
      rate: 478511.87,
      btc: 2446067
    },
    {
      rate: 478000,
      btc: 80253706
    },
    {
      rate: 477900,
      btc: 6261808
    },
    {
      rate: 477777,
      btc: 208900000
    },
    {
      rate: 477740,
      btc: 15000000
    },
    {
      rate: 477706.19,
      btc: 5003424
    }
  ],
  status: 1,
  error: null
}

 Explanation of fields:
 rate -> the amount of the order
 btc -> the volume of the coin for that order
   </pre>
</details>

<b>Getting Sell Order Book</b><br>
<pre>
bitbns.getSellOrderBook('BTCUSDT', function(e, d){
console.log(e,d);
});
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
    "data": [
        { "rate": 13701.34, "btc": 0.145853 },
        { "rate": 13701.35, "btc": 0.043633 },
        { "rate": 13701.47, "btc": 0.543258 },
        { "rate": 13701.69, "btc": 0.664955 },
        { "rate": 13701.72, "btc": 0.131749 },
        { "rate": 13702.36, "btc": 0.406614 },
        { "rate": 13703.18, "btc": 0.253289 },
        { "rate": 13713.46, "btc": 0.19549 },
        { "rate": 13713.88, "btc": 0.055847 },
        { "rate": 13740, "btc": 0.03642294 },
        { "rate": 13848.3, "btc": 0.14447299 },
        { "rate": 13855, "btc": 0.03 },
        { "rate": 13855.11, "btc": 0.0119887 },
        { "rate": 13879.39, "btc": 0.0001 },
        { "rate": 14000, "btc": 0.00163832 }
    ],
    "status": 1,
    "error": None,
    "code": 200
}

 Explanation of fields:
 rate -> the amount of the order
 btc -> the volume of the coin for that order
   </pre>
</details>

<b>Getting Buy Order Book</b><br>
<pre>
bitbns.getBuyOrderBook('BTC', function(e, d){
console.log(e,d);
});
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    { data:
  [ { rate: 481847.56, btc: 6352679 },
    { rate: 481700, btc: 5540000 },
    { rate: 481551, btc: 5000000 },
    { rate: 481000, btc: 11406 },
    { rate: 480000, btc: 208021 },
    { rate: 479366.65, btc: 5265026 },
    { rate: 479345, btc: 453445 },

    { rate: 478854.18, btc: 642042 },
    { rate: 478749.87, btc: 208356 },
    { rate: 478511.87, btc: 2446067 },
    { rate: 478000, btc: 80253706 },
    { rate: 477900, btc: 6261808 },
    { rate: 477777, btc: 208900000 },
    { rate: 477740, btc: 15000000 },
    { rate: 477706.19, btc: 5003424 } ],
 status: 1,
 error: null }

 Explanation of fields:
 rate -> the amount of the order
 btc -> the volume of the coin for that order
  </pre>
</details>

<b>Getting Buy Order Book</b><br>
<pre>
bitbns.getBuyOrderBook('BTCUSDT', function(e, d){
console.log(e,d);
});
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
    "data": [
        { "rate": 13657.14, "btc": 0.245901 },
        { "rate": 13656.94, "btc": 0.043868 },
        { "rate": 13656.58, "btc": 0.249137 },
        { "rate": 13656.57, "btc": 0.215321 },
        { "rate": 13656.56, "btc": 0.06557399 },
        { "rate": 13656.26, "btc": 0.28264299 },
        { "rate": 13621.07, "btc": 0.086085 },
        { "rate": 13620.93, "btc": 0.307243 },
        { "rate": 13620.77, "btc": 0.466551 },
        { "rate": 13620.71, "btc": 0.203805 },
        { "rate": 13618.79, "btc": 0.01179179 },
        { "rate": 13600, "btc": 0.00461852 },
        { "rate": 13150, "btc": 0.07585551 },
        { "rate": 13000, "btc": 0.00368308 },
        { "rate": 12950, "btc": 0.01540463 }
    ],
    "status": 1,
    "error": None,
    "code": 200
}


 Explanation of fields:
 rate -> the amount of the order
 btc -> the volume of the coin for that order
  </pre>
</details>

<b>Get executed trades list </b><br>
<pre>
let pageNo = 0; // starts with 0
let since = '2019-01-01T00:00:00Z'; // shows trade after that period
bitbns.listExecutedOrders('XRP', pageNo, since, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

Use symbol as XRPUSDT for fetching executed orders of USDT market. Just coin name, XRP, will return trades of INR market
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
   { data:
   [ { type: 'BTC Sell order executed',
       typeI: 30,
       crypto: 13972,
       amount: 1.01,
       rate: '7246.8604',
       date: '2019-11-27T12:05:10.000Z',
       unit: 'USDT',
       factor: 100000000,
       fee: 1,
       delh_btc: -13972,
       delh_inr: 0,
       del_btc: 0,
       del_inr: 101 } ],
  status: 1,
  error: null }

Explanation of fields:
type -> type of action
typeI -> action id
amount -> the amount deposited
date -> the time at which this event occured
unit -> the symbol name of coin
factor -> the division factor
del_btc -> delta changes in normal wallet of coin
del_inr -> delta changes in normal inr wallet
delh_btc -> delta changes in hold wallet of coin
  </pre>
</details>


<b>Get API usage Status</b><br>
<pre>
bitbns.getApiUsageStatus(function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
     data: {
        readLimt : 100,
        writeLimit : 30,
        readRateUsed: 0,
        writeRateUsed: 1,
        status: 1
     },
      status: 1,
      error: null
    }
  Explanation of the fields:
  readLimit -> the read limit of the user
  writeLimit -> the write limit of the user
  readRateUsed -> the read requests used
  writeRateUsed -> the write requests used
  </pre>
</details>



<b>Getting Order Status</b><br>
<pre>
bitbns.orderStatus('BTC', '4221', function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
4221 -> order id
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
{
  data: [
    {
      entry_id: 4221,
      btc: 0.001,
      rate: 306929.01,
      time: '2018-09-20T13:54:21.000Z',
      type: 0,
      status: 0
    }
  ],
  status: 1,
  error: null
}

Explanation of fields:
entry_id -> the unique id for the order
btc -> the volume of the currency placed
rate -> the rate at which the order is placed
time -> the timestamp of the entry
type -> 0 for buy and 1 for sell
status -> -1 for cancelled, 0 for not processed, 1 for partially executed, 2 for fully executed
  </pre>
</details>

<b>Cancel Stop Loss Order</b><br>
<pre>
bitbns.cancelStopLossOrder('BTC', 4221 , function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
4221 -> order id
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  data: 'Successfully cancelled the order',
  status: 1,
  error: null
}

Explanation of fields:
data -> the custom message
status -> for successful request the status is 1
  </pre>
</details>

<h3>API V2 (New Features)</h3>
<b>Place Orders(BUY or SELL)</b><br>
<pre>
<b>(Placing Bracket Order)</b>

bitbns.placeOrders({
	symbol : 'XRP',
	side : 'BUY',
	quantity : 40,
	rate : 4,
	target_rate : 5,
	t_rate : 3.5,
	trail_rate : .01
},function(error, data) {
	console.log(data)
});

side -> BUY or SELL
symbol -> COIN NAME,
quantity -> QUANTITY,
rate -> RATE,
target_rate -> TARGET RATE,
t_rate -> TRRIGER RATE,
trail_rate -> TRAIL RATE

To Place Simple Buy or Sell Order use <b>rate</b>
To Place Stoploss Buy or Sell Order use <b>rate & t_rate</b>
To Place Bracket Buy or Sell Order use <b>rate , t_rate, target_rate & trail_rate</b>
</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": "Successfully placed a bracket order",
  "status": 1,
  "error": null,
  "id": 4518726,
  "code": 200
}

Explanation of fields:
data -> the custom message
status -> for successful request the status is 1
id -> the unique id of the order
  </pre>
</details>

<b>Cancel Order</b><br>
<pre>

bitbns.cancelOrders({
	symbol : 'XRP',
	side : 'cancelOrder',
	entry_id : 462
}, function(error, data) {
	console.log(error, data);
});

side -> "cancelOrder","cancelStopLossOrder", "usdtcancelOrder", "usdtcancelStopLossOrder"
symbol -> COIN NAME
entry_id : ENTRY ID

</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": "Successfully cancelled the order",
  "status": 1,
  "error": null,
  "code": 200
}

Explanation of fields:
data -> the custom message
status -> for successful request the status is 1
  </pre>
</details>

<b>Place Orders in USDT Market</b><br>
<pre>
bitbns.placeOrders({
	symbol : 'TRX_USDT',
	side : 'BUY',
	quantity : 40,
	rate : 4,
	target_rate : 5,
	t_rate : 3.5,
	trail_rate : .01
},function(error, data) {
	console.log(data)
});

side -> BUY or SELL
symbol -> COIN NAME(use suffix "_USDT" with coin name)
quantity -> QUANTITY,
rate -> RATE,
target_rate -> TARGET RATE,
t_rate -> TRRIGER RATE,
trail_rate -> TRAIL RATE

To Place Simple Buy or Sell Order use <b>rate</b>
To Place Stoploss Buy or Sell Order use <b>rate & t_rate</b>
To Place Bracket Buy or Sell Order use <b>rate , t_rate, target_rate & trail_rate</b>

</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
   {
  "data": "Successfully placed bid to purchase currency",
  "status": 1,
  "error": null,
  "id": 6743385,
  "code": 200
}

Explanation of fields:
data -> the custom message
status -> for successful request the status is 1
id -> the unique id of the order
  </pre>
</details>

<b>Cancel Order in USDT MARKET</b><br>
<pre>

bitbns.cancelOrders({
	symbol : 'TRX_USDT',
	side : 'usdtcancelOrder',
	entry_id : 462
}, function(error, data) {
	console.log(error, data);
});

side -> "cancelOrder","cancelStopLossOrder", "usdtcancelOrder", "usdtcancelStopLossOrder"
symbol -> COIN NAME(use suffix "_USDT" with coin name)
entry_id : ENTRY ID

</pre>

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": "Successfully cancelled the order",
  "status": 1,
  "error": null,
  "code": 200
}

Explanation of fields:
data -> the custom message
status -> for successful request the status is 1
  </pre>
</details>

<b>Get Orders in USDT MARKET</b><br>
<pre>

bitbns.getOrders({
	side : 'usdtListOpenOrders',
	symbol : 'TRX_USDT',
	page : 0
}, function(error, data) {
	console.log(data)
});

side -> "listOpenOrders", "listOpenStopOrders", "listOpenBracketOrders", "usdtListOpenBracketOrders",
         "usdtListOpenStopOrders","usdtListOpenOrders"
symbol -> COIN NAME(use suffix "_USDT" with coin name)
page -> INTEGER

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": [
    {
      "entry_id": 6747351,
      "btc": 750,
      "rate": 0.02,
      "time": "2020-10-31T04:43:30.000Z",
      "type": 0,
      "status": 0
    }
  ],
  "status": 1,
  "error": null,
  "code": 200
}

Explanation of fields:
rate -> the amount of the order
btc -> the volume of the coin for that order
type -> 1 for sell and 0 for buy order
status -> for successful request the status is 1
  </pre>
</details>

<b>Get Token to authenticate Orders socket</b><br>
<pre>
bitbns.getTokenSocket(function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
     data: '6efgunSa2bH6FrteeS0ZcozU5h_9',
      status: 1,
      error: null
    }
  </pre>
</details>

<b>Use socket to get live order book</b><br>
<pre>

const socket = bitbns.getOrderBookSocket('BTC', 'INR')

socket.on('connect', () => console.log('Connected'))

socket.on('news', res => {
	try {
		const data = JSON.parse(res)
		console.log('Data Received')
		console.log(data)
	} catch (e) {
		console.log('Error in the Stream', e)
	}
})

socket.on('disconnect', () => console.log('Disconnected'))

</pre>

<b>Use socket to get live executed order of your account</b><br>
<pre>

bitbns.getTokenSocket(function(error, response){
 if(!error){

  let data = JSON.parse(response);
  let token = response.data;
  const socket = bitbns.getExecutedOrders(token);

  socket.on('connect', () => console.log('Connected'))

  socket.on('delta_data', res => {
    try {
      const data = JSON.parse(res)
      console.log('Data Received')
      console.log(data)
    } catch (e) {
      console.log('Error in the Stream', e)
    }
  })

  socket.on('disconnect', () => console.log('Disconnected'))


 } else {
   console.log('Error ::', error);
 }

})

</pre>

<b>Get OHLCV data</b><br>
<pre>
bitbns.getOHLCData('BTC', 'INR' , 0, function(error, data){
 if(!error){
   console.log('Data ::', data);
 } else {
   console.log('Error ::', error);
 }
})

here:
BTC -> coin name
INR -> market (INR or USDT)
0 -> page no (use pagination to fetch older data)
</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  status: 1,
  data: [
    {
      close: 2875774.93,
      timestamp: '2021-01-19T03:55:10.000Z',
      low: 2870096.39,
      high: 2884794.25,
      vol: 0.25635386,
      open: 2883492.69
    },
    {
      close: 2875774.93,
      timestamp: '2021-01-19T03:50:10.000Z',
      low: 2870096.39,
      high: 2884794.25,
      vol: 0.25635386,
      open: 2883492.69
    },
	]
}

Explanation of fields:
data -> just a custom message
status -> status of cancellation 1 for success
  </pre>
</details>


<b>Margin Trading V2 APIs</b><br>
<pre>
<b>Place a margin order</b>

bitbns.placeMarginOrders({
	symbol : 'XRP',
	side : 'placeOrder',
  type: 'LEND',
	qnty : 40,
  days : 1,
	rate : 0.0055
},function(error, data) {
	console.log(data)
});

side -> placeOrder
type -> BORROW or LEND
days -> 1,3,7,15,30
renew -> 0,1,2
symbol -> COIN NAME,
qnty -> QUANTITY,
rate -> RATE


Renew Flags => 0 - Don't renew, 1 -> Renew only Principal, 2 -> Renew with Principal + Interest

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "status": 1,
  "error": "Successfully placed lend order for Margin trading.",
  "code": 200
}

Explanation of fields:
error -> the custom message
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Cancel a margin order</b>

bitbns.cancelMarginOrder({
	id : 1,
	side : 'cancelMarginOrder',
	symbol: 'BTC'
},function(error, data) {
	console.log(data)
});



Pass id of the margin transaction you are looking to cancel
symbol -> COIN NAME,

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
      "status": 1,
      "error": "Successfully cancelled the order",
      "code": 200
    }

Explanation of fields:
error -> the custom message
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Settle a margin order partially</b>

bitbns.settleMarginPartial({
	id : 1,
	side : 'settleMarginOrderPartial',
	symbol: 'BTC',
 	amt : 50
},function(error, data) {
	console.log(data)
});


amt -> Amount to settle

Pass id of the margin transaction you are looking to settle and amt you want to settle

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "status": 1,
  "error": "Successfully settled the margin order",
  "code": 200
}

Explanation of fields:
error -> the custom message
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Settle a margin order completely</b>

bitbns.settleMargin({
	id : 1,
	side : 'settleMarginOrder',
	symbol : 'BTC'

},function(error, data) {
	console.log(data)
});




Pass id of the margin transaction you are looking to settle

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "status": 1,
  "error": "Successfully settled the margin order",
  "code": 200
}

Explanation of fields:
error -> the custom message
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Get my margin executed orders</b>

bitbns.listMarginExecuted({
	page : 1,
	side : 'listMarginExecuted',
  type : 'LEND',
  symbol : 'XRP'
},function(error, data) {
	console.log(data)
});

type => LEND or BORROW

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
  response for borrow:
  {
    "data": [
      {
        "entry_id": 53298,
        "worth_required": 8129.82,
        "worth_current": 26779.7,
        "margin_taken": 85,
        "status": 0,
        "expiry": "2020-11-01T07:03:04.000Z",
        "phase": 0,
        "margin_to_return": 85.04,
        "days": 1,
        "interest": 0.055,
        "coin": 54,
        "margin_partial_return": 0
      }
    ],
    "status": 1,
    "error": null,
    "code": 200
  }
response for lend:
    {
      "data": [
        {
          "entry_id": 114143,
          "amt": 50,
          "time": "2020-02-03T02:48:41.000Z",
          "status": 10,
          "expiry": "2020-02-18T08:18:41.000Z",
          "days": 15,
          "interest": 0.051,
          "coin": 54,
          "renew": 0
        }
      ],
      "status": 1,
      "error": null,
      "code": 200
    }

Explanation of fields:
data -> the custom message
worth_required -> the amount required to maintain the margin
worth_current -> current worth of margin borrwoed
margin_taken -> the amount value borrowed
expiry -> time of expiry of margin
margin_to_return -> amount to be returned.
days -> number of days the margin was borrowed or lent.
interest -> intreset of margin per day.
amt -> the amount of coins lent
error -> the custom message
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Get my margin pending orders</b>

bitbns.listMarginPending({
	page : 1,
	side : 'listMarginPending',
  symbol : 'XRP'
},function(error, data) {
	console.log(data)
});

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": [
    {
      "entry_id": 215769,
      "btc": 40,
      "days": 1,
      "time": "2020-10-31T06:42:54.000Z",
      "type": 0,
      "status": 0,
      "rate": 0.083
    }
  ],
  "status": 1,
  "error": null,
  "code": 200
}

Explanation of fields:
data -> the custom message
entry_id -> the unique id assigned to the order
days -> number of days lent or borrowed
btc -> the volume of the coin
type -> 1 for borrow and 0 for lend order
rate -> the rate at which the margin is lend or borrowed
status -> for successful request the status is 1
  </pre>
</details>


<pre>
<b>Get open orders of margin market - all users</b>

bitbns.listMarginMarketOrders({
	type : 'BORROW',
	side : 'listMarketOrders',
  symbol : 'XRP'
},function(error, data) {
	console.log(data)
});

type => LEND or BORROW

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    {
  "data": [
    {
      "btc": 486.55,
      "days": 7,
      "rate": 0.0539
    },
    {
      "btc": 2.31,
      "days": 1,
      "rate": 0.055
    },
    {
      "btc": 4392.95,
      "days": 3,
      "rate": 0.06
    },
    {
      "btc": 99.96,
      "days": 15,
      "rate": 0.065
    },
    {
      "btc": 1242,
      "days": 30,
      "rate": 0.065
    },
    {
      "btc": 13287.65,
      "days": 7,
      "rate": 0.067
    },
    {
      "btc": 350,
      "days": 30,
      "rate": 0.068
    },
    {
      "btc": 5500,
      "days": 7,
      "rate": 0.07
    },
    {
      "btc": 2119.34,
      "days": 30,
      "rate": 0.0749
    },
    {
      "btc": 1770.51,
      "days": 30,
      "rate": 0.076
    },
    {
      "btc": 53.52,
      "days": 30,
      "rate": 0.0779
    },
    {
      "btc": 3231.92,
      "days": 15,
      "rate": 0.078
    },
    {
      "btc": 622.69,
      "days": 15,
      "rate": 0.079
    },
    {
      "btc": 17306,
      "days": 1,
      "rate": 0.08
    },
    {
      "btc": 7840,
      "days": 15,
      "rate": 0.085
    },
    {
      "btc": 446.07,
      "days": 30,
      "rate": 0.0855
    },
    {
      "btc": 762.59,
      "days": 30,
      "rate": 0.0856
    },
    {
      "btc": 500,
      "days": 30,
      "rate": 0.087
    },
    {
      "btc": 195.66,
      "days": 30,
      "rate": 0.088
    },
    {
      "btc": 112.33,
      "days": 30,
      "rate": 0.089
    },
    {
      "btc": 2769,
      "days": 1,
      "rate": 0.09
    },
    {
      "btc": 20000,
      "days": 3,
      "rate": 0.09
    },
    {
      "btc": 7000,
      "days": 7,
      "rate": 0.09
    },
    {
      "btc": 8525.51,
      "days": 30,
      "rate": 0.09
    },
    {
      "btc": 206,
      "days": 1,
      "rate": 0.091
    },
    {
      "btc": 20000,
      "days": 15,
      "rate": 0.091
    },
    {
      "btc": 2096.32,
      "days": 30,
      "rate": 0.099
    },
    {
      "btc": 235,
      "days": 1,
      "rate": 0.1
    },
    {
      "btc": 401780.26,
      "days": 30,
      "rate": 0.1
    },
    {
      "btc": 50000,
      "days": 30,
      "rate": 0.11
    },
    {
      "btc": 19999.81,
      "days": 15,
      "rate": 0.12
    },
    {
      "btc": 61.71,
      "days": 30,
      "rate": 0.12
    },
    {
      "btc": 107.45,
      "days": 30,
      "rate": 0.14
    },
    {
      "btc": 43212,
      "days": 15,
      "rate": 0.169
    },
    {
      "btc": 30000,
      "days": 7,
      "rate": 0.17
    },
    {
      "btc": 90610.26,
      "days": 30,
      "rate": 0.18
    }
  ],
  "status": 1,
  "error": null,
  "code": 200
}

Explanation of fields:
data -> the custom message
days -> number of days lent or borrowed
btc -> the volume of the coin
rate -> the rate at which the margin is lend or borrowed
status -> for successful request the status is 1
  </pre>
</details>


<h3>Trading Basic Tutorial</h3>
<code>Trust the data if status flag is 1 and error is null in response</code>

<h4>1. Placing buy order for 100 XRP at Market Order</h4>

<pre>
let volume_to_buy = 100;
bitbns.platformStatus(function(error, res1){
  if(res1.data['XRP'].status == 1){
    bitbns.getSellOrderBook('XRP', function(error, res2){
      if(res2.status == 1){
          console.log(res2);
          let volume_available = 0;
          let max_sell_price_available = 0;
          for(let idx = 0; idx < res2.data.length; idx++){
            volume_available += res2.data[idx].btc;// Here .btc represent Volume
            max_sell_price_available = Math.max(max_sell_price_available, res2.data[idx].rate);
            if(volume_available >= volume_to_buy){
              break;
            }
          }
          if(volume_available >= volume_to_buy){
            bitbns.placeBuyOrder('XRP', volume_to_buy, max_sell_price_available, function(error, data){
              if(!error){
                 console.log('OrderId ::', data);
               } else {
                 console.log('Error ::', error);
               }
            })
          } else{
            console.log("Volume insufficent");
          }

      }
    });
  }else{
    console.log("Error");
  }
});

</pre>
<details>
  <summary>
   View Response
  </summary>
  <pre>
    OrderId :: {"data":"Successfully placed bid to purchase currency","status":1,"error":null,"id":491}
  </pre>
  </details>

<h4>2. Cancel All Open Order For XRP</h4>

<pre>
function cancelEntryId(coinName, entryId){
    return new Promise(function(resolve, reject){
    bitbns.cancelOrder(coinName, entryId , function(error, data){
        if(!error){
         resolve(data);
        } else {
          reject(error);
        }
      })
  });
  }

async function cancelAllOpenOrdersEntriesForSpecificCoins(coinName, entryIdLists){
  for(let idx = 0; idx < entryIdLists.length; idx++){
    try{
      let response = await cancelEntryId(coinName, entryIdLists[idx]);
      console.log(response);
    } catch(e){
      console.log(e);
    }
  }
}

bitbns.platformStatus(function(error, res1){
  if(res1.data['XRP'].status == 1){
    bitbns.listOpenOrders('XRP', function(error, res2){
        if(!error){
            if(res2.status == 1 && res2.error == null){
              let entryIdLists = [];
              for(let idx = 0; idx < res2.data.length; idx++){
                entryIdLists.push(res2.data[idx].entry_id);
              }
              cancelAllOpenOrdersEntriesForSpecificCoins('XRP', entryIdLists);
            } else{
              console.log("Error :: ", res2.error);
            }
        } else {
          console.log('Error ::', error);
        }
      })
  }else{
    console.log("Error");
  }
});
</pre>

<details>
  <summary>
   View Response
  </summary>
  <pre>
   { data: 'Successfully cancelled the order',
    status: 1,
    error: null }
  { data: 'Successfully cancelled the order',
    status: 1,
    error: null }
  ...
  </pre>
  </details>

<b>Curl request to get server time</b><br>
 <pre>
 curl -H "X-BITBNS-APIKEY: API-KEY" -X GET 'https://api.bitbns.com/api/trade/v1/getServerTime'
 </pre>
 <details>
   <summary>
    View Response
   </summary>
   <pre>
     {
   serverTime: '1538150764273',
   status: 1,
   error: null
 }
   </pre>
 </details>


<h2>HTTP error status codes </h2>
<h3> HTTP error codes would be returned incase of any errors, the body will also cointain an error feild which will explain the cause of the error</h3>
<div id ="HTTP_error_code_table" style ="border:1px solid">
  <table style = "width:100%">
    <tr>
      <th>Code</th>
      <th>Meaning</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <th>200</th>
      <th>null -- requested action has been performed without any problems </th>
    </tr>
    <tr>
      <th>400</th>
      <th>Invalid Request -- Invalid request format</th>
    </tr>
    <tr>
      <th>401</th>
      <th>authentication -- Not authorised or invalid API key</th>
    </tr>
    <tr>
      <th>403</th>
      <th>Undefined -- this request is forbidden</th>
    </tr>
    <tr>
      <th>404</th>
      <th>Exchange not found -- Unable to find exchange</th>
    </tr>
    <tr>
      <th>406</th>
      <th>Coin name not supplied or not yet supported -- coin name applied is incorrect</th>
    </tr>
    <tr>
      <th>409</th>
      <th>parameter type not correct -- parameters entered is incorrect</th>
    </tr>
    <tr>
      <th>412</th>
      <th>Oops ! Cancellation failed. Something went wrong ! -- Unable to cancel order</th>
    </tr>
    <tr>
      <th>413</th>
      <th>volume asked not acceptable -- Desired volume is not within bounds</th>
    </tr>
     <tr>
      <th>416</th>
      <th>Oops ! Not sufficient balance to purchase currency -- wallet balance is not sufficient </th>
    </tr>
     <tr>
      <th>417</th>
      <th>Oops ! Order doesn't exist any more -- Order has alredy been deleted</th>
    </tr>
     <tr>
      <th>428</th>
      <th>Price seems Irregular from current market price. -- Entered price is more than current price</th>
    </tr>
         <tr>
      <th>500</th>
      <th>Problem with our servers, try again later</th>
    </tr>
         <tr>
      <th>503</th>
      <th>currently down for maintaince</th>
    </tr>
    </tr>
  </table>
</div>
