const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
  fileNumber: {
    type: String,
    required: true
  },
  criminalName: {
    type: String,
    required: true
  },
  criminalIdNumber: {
    type: String,
    required: true
  },
  crimeCommittedPlace: {
    type: String,
    required: true
  },
  crimeDescription: {
    type: String,
    required: true
  },
  crimeType: {
    type: String,
    required: true
  },
  victimName: {
    type: String
  },
  victimId: {
    type: String
  },
  additionalFiles: [{
    file_path: {
      type: String
    }
  }]
});

const Crime = mongoose.model('Crime', crimeSchema);

module.exports = Crime;
