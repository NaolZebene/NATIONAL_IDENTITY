const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// GET /transactions - Fetch all transactions
router.get('/transactions/',isLoggedIn,authorize("pharmacist"), transactionController.getAllTransactions);

// GET /transactions/new - Render the form for creating a new transaction
router.get('/transactions/create',isLoggedIn,authorize("pharmacist"), transactionController.renderNewTransactionForm);

// POST /transactions - Create a new transaction
router.post('/transactions/create',isLoggedIn,authorize("pharmacist"), transactionController.createTransaction);

// GET /transactions/:id - Fetch a transaction by ID


// GET /transactions/:id/edit - Render the form for editing a transaction
router.get('/transactions/update/:id/',isLoggedIn,authorize("pharmacist"), transactionController.renderEditTransactionForm);

// PUT /transactions/:id - Update a transaction
router.post('/transactions/update/:id',isLoggedIn,authorize("pharmacist"), transactionController.updateTransaction);

// DELETE /transactions/:id - Delete a transaction
router.post('/transactions/delete/:id',isLoggedIn,authorize("pharmacist"), transactionController.deleteTransaction);


router.get('/transactions/:id',isLoggedIn,authorize("pharmacist"), transactionController.getTransactionById);
module.exports = router;
