const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referralType: {
    type: String,
    required: true
  },
  weaknesses: {
    type: String
  },
  currentCase: {
    type: String,
    required: true
  },
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  location: {
    type: String
  },
  hospitalName: {
    type: String,
    required: true
  },
  hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subsector'
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'active'],
    default: 'pending'
  },
  requestSent:{
    type:Boolean, 
    default:true
  },
  from:{
    type:mongoose.Types.ObjectId,
    ref:'Subsector'
  },
  emergencyCode: {
    type:String, 
    required:false
  }, 
  fingerprint:{
    type:String
  }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
