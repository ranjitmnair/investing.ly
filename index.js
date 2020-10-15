const express=require('express');
const app=express();
const mongoose = require('mongoose');
const request = require('request');
app.use(express.json());
require('dotenv').config();
mongoose.connect('mongodb+srv://ranjit:ETDYDdv9bNk5UWsW@cluster0.0k4za.mongodb.net/investingly?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false},()=>{
    console.log("database connected");
})


// const options = {
//   method: 'GET',
//   url: 'https://rapidapi.p.rapidapi.com/market/v2/get-quotes',
//   qs: {symbols: 'ITC.NS', region: 'IN'},
//   headers: {
//     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//     'x-rapidapi-key': process.env.STOCK_API_KEY,
//     useQueryString: true
//   }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     var result=JSON.parse(body);
// 	console.log(result.quoteResponse.result[0].regularMarketPrice);
// });
const authRoute=require('./routes/auth');
const stockRoute=require('./routes/stocks');
const fundRoute=require('./routes/funds');
const cryptoRoute=require('./routes/cryptos');

app.use('/api/user',authRoute);
app.use('/api/stocks',stockRoute);
app.use('/api/funds',fundRoute);
app.use('/api/cryptos',cryptoRoute);
app.get('/',(req,res)=>{res.status(200).send("Main page")});


app.listen(process.env.PORT||3000,()=>console.log('Server Running'));