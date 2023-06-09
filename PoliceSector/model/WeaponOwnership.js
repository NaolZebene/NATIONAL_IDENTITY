const mongoose = require('mongoose');
const { Schema } = mongoose;

const weaponOwnershipSchema = new Schema({
  weaponSerialNumber: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerIdNumber: {
    type: String,
    required: true,
  },
  personalInformation: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },
  additionalFiles: [
    {
      filePath: {
        type: String,
      },
    },
  ],
  fingerprint: {
    type: String,
  },
  weaponInfo: {
    type: Schema.Types.ObjectId,
    ref: 'Weapon',
  },
  sector_created:{
    type:mongoose.Types.ObjectId, 
    ref:"Subsector"
  }
});

const WeaponOwnership = mongoose.model('WeaponOwnership', weaponOwnershipSchema);

module.exports = WeaponOwnership;
