const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// Render the create form
router.get('/employees/create',isLoggedIn,authorize(["admin"]), employeeController.renderCreateForm);

// Create a new employee
router.post('/employees/',isLoggedIn,authorize(["admin"]), employeeController.createEmployee);

// Render the update form for a specific employee
router.get('/employees/:id/edit',isLoggedIn,authorize(["admin"]), employeeController.renderUpdateForm);

// Update a specific employee
router.post('/employees/:id',isLoggedIn,authorize(["admin"]), employeeController.updateEmployee);

// Delete a specific employee
router.get('/employees/:id/delete',isLoggedIn,authorize(["admin"]), employeeController.deleteEmployee);

// View details of a specific employee
router.get('/employees/:id',isLoggedIn,authorize(["admin"]), employeeController.viewDetails);

// View all employees
router.get('/employees/',isLoggedIn,authorize(["admin"]), employeeController.viewAllEmployees);

module.exports = router;
