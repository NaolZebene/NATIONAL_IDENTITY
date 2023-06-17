const mongoose = require("mongoose")

const {Schema, model} = mongoose;


const usersSchema = new Schema({
    fullname:{
        type:String, 
        required:true
    }, 
    email:{
        type:String, 
        required:true
    }, 
    password:{
        type:String, 
        required:true
    }, 
    role:{
        type:String, 
        enum:["superAdmin"]
    }
})


const Users = model("Users", usersSchema); 

module.exports= Users