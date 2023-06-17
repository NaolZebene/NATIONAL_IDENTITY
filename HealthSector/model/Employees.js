const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  uniqC: {
    type: Number,
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  sector_id :{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"Subsector"
  },
  role: {
    type: String,
    enum: ['admin',"card", 'lab_tech',"ctscan","ultrasound","xray", 'doctor', "pharmacist","centralAdmin"],
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
