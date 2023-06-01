const express = require('express');
const router = express.Router();
const drugController = require('../controller/drugController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// Render the create form
router.get('/drugs/create',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.renderCreateForm);

// Create a new drug
router.post('/drugs/create',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.createDrug);

// Render the update form for a specific drug
router.get('/drugs/update/:id',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.renderUpdateForm);

// Update a specific drug
router.post('/drugs/update/:id',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.updateDrug);

// Delete a specific drug
router.post('/drugs/delete/:id',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.deleteDrug);

// View details of a specific drug
router.get('/drugs/:id',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.viewDetails);

// View all drugs
router.get('/drugs',isLoggedIn,authorize(["pharmacist", "admin"]), drugController.viewAllDrugs);

module.exports = router;
