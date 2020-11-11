const router=require('express').Router();
const express=require('express');
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation}=require('../validation');
const verifyToken=require('../middleware/verifyToken');
require('dotenv').config();

router.post('/signup',async(req,res)=>{
    //validation
    const {error}=registerValidation(req.body);
    if(error)return res.status(400).json(error.details[0].message);


    // check if user already exists:
        const emailExist=await User.findOne({email:req.body.email});        
        if(emailExist)return res.status(400).json("Email already exists");
    

    //hashing password

    const salt=await bcrypt.genSalt(7);//salt added
    const hashPassword=await bcrypt.hash(req.body.password,salt);
    console.log(hashPassword);
     
    // hence create user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedUser= await user.save();
        console.log("saved");
      //  req.session.user = newUser
        return res.status(200).send({message:"Registered successfully"});
    }catch(err){
        return res.status(400).send(err);
    }
});

router.post('/login',async(req,res)=>{

    //checking validation
    const {error}=loginValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('User not Found');

    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)return res.status(400).send('Password wrong');

    const token=jwt.sign({_id:user._id},process.env.SECRET_TOKEN,{expiresIn:'24h'});

    res.header('auth-token',token).json({token});

});

module.exports=router;