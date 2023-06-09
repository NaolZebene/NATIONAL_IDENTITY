const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const {isLoggedIn} = require("../util/isLoggedIn");

const {authorize} = require("../util/Authorization")

// Render create employee form
router.get('/employees/create',isLoggedIn,authorize(["admin"]), employeeController.renderCreateEmployeeForm);

// Handle create employee form submission
router.post('/employees',isLoggedIn,authorize(["admin"]), employeeController.createEmployee);

// Render update employee form
router.get('/employees/:id/edit',isLoggedIn,authorize(["admin"]), employeeController.renderEditEmployeeForm);

// Handle update employee form submission
router.post('/employees/:id',isLoggedIn,authorize(["admin"]), employeeController.editEmployee);

// Render employee details
router.get('/employees/:id',isLoggedIn,authorize(["admin"]), employeeController.renderEmployeeDetails);

// Render all employees
router.get('/employees',isLoggedIn,authorize(["admin"]), employeeController.renderAllEmployees);

// Delete an employee
router.post('/employees/delete/:id/',isLoggedIn,authorize(["admin"]), employeeController.deleteEmployee);

module.exports = router;
