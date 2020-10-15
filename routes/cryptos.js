const router = require ('express').Router();
const User = require ('../models/User');
const Crypto = require ('../models/Crypto');
const request = require('request');
const verifyToken = require ('../middleware/verifyToken');
const { json } = require('express');
require ('dotenv').config ();


router.get('/getcryptoprice/:cryptoCode', verifyToken, async (req, res) => {
  var code = req.params.cryptoCode; //stock code
 code=code.toString().toUpperCase();
 const options = {
   method: 'GET',
   url: 'https://rapidapi.p.rapidapi.com/query',
   qs: {from_currency: code, function: 'CURRENCY_EXCHANGE_RATE', to_currency: 'INR'},
   headers: {
     'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
     'x-rapidapi-key':process.env.CRYPTO_API_KEY,
     useQueryString: true
   }
 };
 
 request(options, function (error, response, body) {
     if (error) throw new Error(error);
     var result = JSON.parse (body);
     var temp={valueinINR:result['Realtime Currency Exchange Rate']['5. Exchange Rate']}
     res.status(200).json(temp);
   });
});

router.post('/buycrypto',verifyToken,async(req,res)=>{
    var code = req.body.cryptoCode; //stock code
    code=code.toUpperCase();
    const newCrypto = new Crypto({
        user:req.user._id,
        cryptoCode: code,
        purchasePrice: req.body.purchasePrice,
        numberOfCoins: req.body.numberOfCoins
    });

    try{
        const savedCrypto= await newCrypto.save();
        return res.status(200).json(newCrypto);
    }catch(err){
        return res.status(400).send(err);
    }
})

router.get('/mycryptos',verifyToken,async(req,res)=>{
    const cryptos= await Crypto.find({ user: req.user.id })
     .sort({ date: -1 });
    res.status(200).json(cryptos);
   })



module.exports=router;