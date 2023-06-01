const mongoose = require('mongoose');

const subsectorSchema = new mongoose.Schema({
  subsectorName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'suborganization'
  }
});

const Subsector = mongoose.model('Subsector', subsectorSchema);

module.exports = Subsector;
