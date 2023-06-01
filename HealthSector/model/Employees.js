const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
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
    enum: ['admin',"card", 'manager', 'employee', 'lab_tech', 'doctor', "pharmacist","centralAdmin"],
    required: true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
