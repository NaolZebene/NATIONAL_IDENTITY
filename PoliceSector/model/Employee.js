const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fingerprint: {
    type: String,
    required: false
  },
  idNumber: {
    type: String,
    required: false,  
  },
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: false
  },
  role: {
    type: String,
    enum: ['admin',"centralAdmin", 'manager', 'office_worker', "employee", "inventory"],
    required: true
  },
  sector_id:{
    type:mongoose.Types.ObjectId,
    ref:"Subsector"
  },
  password: {
    type: String,
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
