const mongoose = require("mongoose")


const {Schema, model} = mongoose;



const flowSchema = new Schema({
    _id:{
        type:Number
    },
    currentIdx:{
        type:Number, 
        default:0
    }
})

const Flow = model("Model", flowSchema);

module.exports = Flow;