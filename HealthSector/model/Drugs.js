const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  Drug_name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  Total_sold: {
    type: Number,
    default: 0
  },
  TotalIncome:{
    type:Number, 
    default:0
  },
  sector_id:{
    type:mongoose.Types.ObjectId,
    ref:'Subsector'
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});

const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;
