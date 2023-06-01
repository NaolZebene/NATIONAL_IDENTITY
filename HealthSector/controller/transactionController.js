const Transaction = require('../model/Transactions');
const Drug = require('../model/Drugs')
// GET /transactions - Fetch all transactions
module.exports.getAllTransactions = async (req, res) => {
  try {
    const sector = req.session.user.sector_id
    const transactions = await Transaction.find({sector_id: sector});
    res.render('transactions/view-all-transaction', { transactions });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// GET /transactions/:id - Fetch a transaction by ID
module.exports.getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return res.render('error', { message: 'Transaction not found' });
    }

    res.render('transactions/view-details', { transaction });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// GET /transactions/new - Render the form for creating a new transaction
module.exports.renderNewTransactionForm = (req, res) => {
  res.render('transactions/create-transaction');
};

// POST /transactions - Create a new transaction
module.exports.createTransaction = async (req, res) => {
  const { personId, dateSold, amount, cash, drugName } = req.body;

  const subsector = req.session.user.sector_id;
  const drug = await Drug.findOne({sector_id:subsector , Drug_name:drugName});
  console.log(drug, subsector, drugName)
  if(!drug){
    return res.json({
      msg:"No Such Drug"
    })
  }


  try {
    const transaction = await Transaction.create({
      personId,
      dateSold,
      Amount: amount,
      Employee: req.session.user._id,
      Cash: cash,
      drugName, 
      sector_id:req.session.user.sector_id
    });

    let left = Number(drug.amount) - Number(amount)
    if(left < 0){
      return res.json({
        msg:"Not Enough Drug"
      })
    }
    drug.amount = left;
    drug.Total_sold = Number(drug.Total_sold) + Number(amount)
    drug.TotalIncome = Number(drug.TotalIncome) + cash;
    await drug.save();
    await transaction.save();

    res.redirect(`/transactions/${transaction._id}`);
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// GET /transactions/:id/edit - Render the form for editing a transaction
module.exports.renderEditTransactionForm = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    
    if (!transaction) {
      return res.render('error', { message: 'Transaction not found' });
    }

    res.render('transactions/edit-transaction', { transaction });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// PUT /transactions/:id - Update a transaction
module.exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { personId, dateSold, amount, employeeId, cash } = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(id, {
      personId,
      dateSold,
      Amount: amount,
      Employee: employeeId,
      Cash: cash
    }, { new: true });

    if (!transaction) {
      return res.render('error', { message: 'Transaction not found' });
    }

    res.redirect(`/transactions/${transaction._id}`);
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// DELETE /transactions/:id - Delete a transaction
module.exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.render('error', { message: 'Transaction not found' });
    }

    res.redirect('/transactions');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
