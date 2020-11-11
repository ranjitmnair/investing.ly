const router = require ('express').Router ();
const User = require ('../models/User');
const Trade = require ('../models/Trade');
const request = require ('request');
const verifyToken = require ('../middleware/verifyToken');
const {json} = require ('express');
require ('dotenv').config ();

router.get ('/getstockprice/:code', verifyToken, async (req, res) => {
  var symbol = req.params.code; //stock code
  symbol = symbol.toUpperCase () + '.NS';
  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/market/v2/get-quotes',
    qs: {symbols: symbol, region: 'IN'},
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.STOCK_API_KEY,
      useQueryString: true,
    },
  };

  request (options, function (error, response, body) {
    if (error) throw new Error (error);
    var result = JSON.parse (body);
    try {
      res.status (200).json ({currentPrice:result.quoteResponse.result[0].regularMarketPrice});
    } catch (error) {
      res.status (400).json ({message: 'Enter correct stock code'});
    }
  });
});

router.post ('/buystock', verifyToken, async (req, res) => {
  var symbol = req.body.symbol; //stock code
  symbol = symbol.toUpperCase () + '.NS';
  if(req.body.purchasePrice<0||req.body.numberOfShares<=0){return res.status(400).json({message:"Incorrect values"});}

  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/market/v2/get-quotes',
    qs: {symbols: symbol, region: 'IN'},
    headers: {
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.STOCK_API_KEY,
      useQueryString: true,
    },
  };

  request (options, async function (error, response, body) {
    if (error) throw new Error (error);
    var result = JSON.parse (body);
    try {
      if(result.quoteResponse.result[0].regularMarketPrice){
        const newTrade = new Trade ({
          user: req.user._id,
          symbol: symbol,
          purchasePrice: req.body.purchasePrice,
          numberOfShares: req.body.numberOfShares,
        });
      
        try {
          const savedTrade = await newTrade.save ();
          return res.status (200).json (newTrade);
        } catch (err) {
          return res.status (400).send (err);
        }
      }
    } catch (error) {
      res.status (400).json ({message: 'Enter correct stock code'});
    }
  });

});

router.get ('/mystocks', verifyToken, async (req, res) => {
  const trades = await Trade.find ({user: req.user.id}).sort ({date: -1});
  res.status (200).json (trades);
});

module.exports = router;
