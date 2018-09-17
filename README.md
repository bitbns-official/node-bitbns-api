# Bitbns Node API

This project is designed to help you make your own projects that interact with the Bitbns API.  This project seeks to have complete API coverage excluding WebSockets which would be released in the future version.

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

<h3>Getting Started</h3><br>

<code>npm install bitbns --save</code>

<pre> 
const bitbnsApi = require('bitbns-api');

const bitbns = new bitbnsApi({
  apiKey :  'API-KEY',
  apiSecretKey : 'SECRET-KEY'
}); 
</pre>

<b>Instantiating Multiple Instances</b><br>
<pre>
const bitbnsApi = require('bitbns-api');

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
   </pre>
</details>

<b>Getting latest price of few symbol</b>
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
 </pre>
</details>

<b>Getting latest price of all symbol</b>
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
Inputing "EVERYTHING" in place of crypto asset would list your balance overall coin present on platform.
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
  </pre>
</details>


<b>Get Specify Crypto Coin Address</b><br>
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
  </pre>
</details>

<b>Getting Sell Order Book</b><br>
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

