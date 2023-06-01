const mongoose = require('mongoose');

const patientInformationSchema = new mongoose.Schema({
  personalInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  Record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }
});

const PatientInformation = mongoose.model('PatientInformation', patientInformationSchema);

module.exports = PatientInformation;

