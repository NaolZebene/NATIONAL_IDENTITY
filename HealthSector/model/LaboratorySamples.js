const mongoose = require('mongoose');

const laboratorySampleSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true
  },
  processName: {
    type: String
  },
  testResult: {
    type: String
  },
  referenceValue: {
    type: String
  },
  dataConducted: {
    type: Date
  },
  diagnosisSummary: {
    type: String
  }
});

const LaboratorySample = mongoose.model('LaboratorySample', laboratorySampleSchema);

module.exports = LaboratorySample;
