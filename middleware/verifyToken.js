const jwt=require('jsonwebtoken');
const User=require('../models/User');
module.exports=function(req,res,next){

    const token=req.header('auth-token');
    if(!token)res.status(401).json({error:"You are not logged in!"});
    try {
        jwt.verify(token,process.env.SECRET_TOKEN,(err,payload)=>{
            if(err)return res.status(401).json({error:"You are not logged in"});
            const {_id}=payload
            User.findById(_id).then(userdata=>{
                req.user=userdata;
                next();
            })
         
        });
    } catch (error) {
        res.status(401).json({error:"invalid token"});
    }

}