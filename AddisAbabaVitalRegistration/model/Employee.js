const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum:["admin", "manager", "employee"]
 
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
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
