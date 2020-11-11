const router = require ('express').Router ();
const User = require ('../models/User');
const Fund = require ('../models/Fund');
const request = require ('request');
const verifyToken = require ('../middleware/verifyToken');
const {json} = require ('express');
require ('dotenv').config ();

router.get ('/getfundprice/:schemeCode', verifyToken, async (req, res) => {
  var code = req.params.schemeCode; //stock code
  code = code.toString ();
  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/fetchLatestNAV',
    qs: {SchemeCode: code},
    headers: {
      'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com',
      'x-rapidapi-key': process.env.MF_API_KEY,
      useQueryString: true,
    },
  };

  request (options, function (error, response, body) {
    if (error) throw new Error (error);
    var result = JSON.parse (body);
    try {
      var temp = {CurrentNAV: result[0]['Net Asset Value']};
      res.status (200).json (temp);
    } catch (error) {
      res.status (400).json ({message: 'Enter correct Mutual Fund Code'});
    }
  });
});

router.post ('/buyfund', verifyToken, async (req, res) => {
  var code = req.body.schemeCode; //stock code
  code = code.toString ();
  if(req.body.purchaseNAV<0||req.body.numberOfUnits<=0){return res.status(400).json({message:"Incorrect values"});}
  const options = {
    method: 'GET',
    url: 'https://rapidapi.p.rapidapi.com/fetchLatestNAV',
    qs: {SchemeCode: code},
    headers: {
      'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com',
      'x-rapidapi-key': process.env.MF_API_KEY,
      useQueryString: true,
    },
  };

  request (options, async function (error, response, body) {
    if (error) throw new Error (error);
    var result = JSON.parse (body);
    try {
      if (result[0]['Net Asset Value']) {
        const newFund = new Fund ({
          user: req.user._id,
          SchemeCode: code,
          purchaseNAV: req.body.purchaseNAV,
          numberOfUnits: req.body.numberOfUnits,
        });

        try {
          const savedFund = await newFund.save ();
          return res.status (200).json (newFund);
        } catch (err) {
          return res.status (400).send (err);
        }
      }
    } catch (error) {
      res.status (400).json ({message: 'Enter correct Mutual Fund Code'});
    }
  });
});

router.get ('/myfunds', verifyToken, async (req, res) => {
  const funds = await Fund.find ({user: req.user.id}).sort ({date: -1});
  res.status (200).json (funds);
});

module.exports = router;
