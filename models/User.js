const mongoose=require('mongoose');
const{ObjectId}=mongoose.Schema.Types;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        min:2,
        required:true
    },
    email:{
        type:String,
        required:true,
        min:10
    },
    password:{
        type:String,
        required:true,
        min:7
    },

})

module.exports=mongoose.model('User',userSchema);