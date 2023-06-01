const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorzation");

// Render the create form
router.get('/employees/create',isLoggedIn,authorize(["admin","manager"]), employeeController.renderCreateForm);

// Create a new employee
router.post('/employees/create',isLoggedIn,authorize(["admin","manager"]), employeeController.createEmployee);

// Render the update form for a specific employee
router.get('/employees/:id/update',isLoggedIn,authorize(["admin","manager"]), employeeController.renderUpdateForm);

// Update a specific employee
router.post('/employees/:id/update',isLoggedIn,authorize(["admin","manager"]), employeeController.updateEmployee);

// Delete a specific employee
router.post('/employees/:id/delete',isLoggedIn,authorize(["admin","manager"]), employeeController.deleteEmployee);

// View details of a specific employee
router.get('/employees/:id',isLoggedIn,authorize(["admin","manager"]), employeeController.viewDetails);

// View all employees
router.get('/employees',isLoggedIn,authorize(["admin","manager"]), employeeController.viewAllEmployees);

module.exports = router;
