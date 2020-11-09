const express=require('express');
const app=express();
const mongoose = require('mongoose');
const request = require('request');
app.use(express.json());
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false},()=>{
    console.log("database connected");
})



const authRoute=require('./routes/auth');
const stockRoute=require('./routes/stocks');
const fundRoute=require('./routes/funds');
const cryptoRoute=require('./routes/cryptos');

app.use('/api/user',authRoute);
app.use('/api/stocks',stockRoute);
app.use('/api/funds',fundRoute);
app.use('/api/cryptos',cryptoRoute);
app.get('/',(req,res)=>{res.status(200).send("Main page")});


app.listen(3000,()=>console.log('Server Running'));