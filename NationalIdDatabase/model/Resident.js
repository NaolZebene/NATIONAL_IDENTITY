const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  fingerprint_uniq:[
    {
      ifingerpint:Number,
      img_path:String,
    }
],
  fatherName: {
    type:String
  },
  motherName: {
    type:String
  },
  birthPlace:{
    type:String
},
phoneNumber: {
    type: String,
    required: true
  },
  idNumber: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  emergencyCall: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  emergencyPersonName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  homeNumber: {
    type: String,
    required: true
  },
  document:{
    type:String
  },
  verified_by_rep:{
    type:Boolean,
    default:false
  },
  email:{
    type:String,
    required:true
  }

});

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;
