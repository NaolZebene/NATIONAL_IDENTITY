const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

// GET /transactions - Fetch all transactions
router.get('/transactions/', transactionController.getAllTransactions);

// GET /transactions/new - Render the form for creating a new transaction
router.get('/transactions/create', transactionController.renderNewTransactionForm);

// POST /transactions - Create a new transaction
router.post('/transactions/create', transactionController.createTransaction);

// GET /transactions/:id - Fetch a transaction by ID


// GET /transactions/:id/edit - Render the form for editing a transaction
router.get('/transactions/update/:id/', transactionController.renderEditTransactionForm);

// PUT /transactions/:id - Update a transaction
router.post('/transactions/update/:id', transactionController.updateTransaction);

// DELETE /transactions/:id - Delete a transaction
router.post('/transactions/delete/:id', transactionController.deleteTransaction);


router.get('/transactions/:id', transactionController.getTransactionById);
module.exports = router;
