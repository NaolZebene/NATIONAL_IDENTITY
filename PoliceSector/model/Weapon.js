const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  weaponName: {
    type: String,
    required: true
  },
  weaponAmount: {
    type: Number,
    required: true
  },
  weaponSerialNumber: {
    type: String,
    required: true
  },
  additionalFiles: [{
    filePath: {
      type: String
    }
  }]
});

const Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;
