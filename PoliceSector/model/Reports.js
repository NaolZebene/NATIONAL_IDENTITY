const mongoose = require('mongoose');

const {Schema, model} = mongoose;



const reportSchema = new Schema({
    reportedHospital:{
        type:String, 
        required:true
    },
    reportedTime:{
        type:String,
        required:true
    }, 
    reportDescription:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        default:false
    }
})


const Report = model('Report', reportSchema);

module.exports = Report;