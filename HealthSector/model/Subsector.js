const mongoose = require('mongoose');

const subsectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  email: {
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
    default: 'sub_organization'
  }
});

const Subsector = mongoose.model('Subsector', subsectorSchema);

module.exports = Subsector;
