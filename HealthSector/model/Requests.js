const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  idNumber:{
    type:String
  },
  labResult: {
    type: mongoose.Types.ObjectId, 
    ref:"LaboratorySample"
  },
  description: {
    type: String
  },
  medicineOrdered: {
    type: String
  },
  diseaseName: {
    type: String
  },
  doctorInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  status: {
    type: String,
    enum: ['tolab', 'todoctor', "completed","toctscan", "toxray", "toultrasound"],
    default: 'todoctor'
  },
  Ct_scan:{
   data : {
    img_path : String,
    description: String
   }
  },
 
  ultraSound : {
    data : {
      img_path : String,
      description: String
     }
  },
  x_ray:{
    data : {
      img_path : String,
      description: String
     }
  }, 

  date : {
    type:Date, 
    required:true
  },

  sector_id:{
    type:mongoose.Types.ObjectId, 
    required:true
  }, 
  priority:{
    type:Number, 
    enum :[1, 2]
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
