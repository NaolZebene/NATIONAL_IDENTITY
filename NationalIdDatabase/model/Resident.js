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
  phoneNumber: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
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
  fingerprint: {
    type: String,
  },
  homeNumber: {
    type: String,
    required: true
  }
});

const Resident = mongoose.model('Resident', residentSchema);

module.exports = Resident;
