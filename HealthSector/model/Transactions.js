const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  personId: {
    type: String,
    required:true,
  },
  drugName:{
    type:String,
    required:true
  },
  dateSold: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  Cash: {
    type: Number,
    required: true
  }, 
  sector_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Subsector'
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
