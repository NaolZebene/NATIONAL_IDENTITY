const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum:["admin", "centralAdmin", "employee"]
 
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  sector_id:{
    type:mongoose.Types.ObjectId, 
    ref:"Subsector"
  },
  
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
