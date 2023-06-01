const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const {isLoggedIn} = require("../util/isLoggedIn");

const {authorize} = require("../util/Authorization")

// Render create employee form
router.get('/employees/create',isLoggedIn,authorize(["manager"]), employeeController.renderCreateEmployeeForm);

// Handle create employee form submission
router.post('/employees',isLoggedIn,authorize(["manager"]), employeeController.createEmployee);

// Render update employee form
router.get('/employees/:id/edit',isLoggedIn,authorize(["manager"]), employeeController.renderEditEmployeeForm);

// Handle update employee form submission
router.post('/employees/:id',isLoggedIn,authorize(["manager"]), employeeController.editEmployee);

// Render employee details
router.get('/employees/:id',isLoggedIn,authorize(["manager"]), employeeController.renderEmployeeDetails);

// Render all employees
router.get('/employees',isLoggedIn,authorize(["manager"]), employeeController.renderAllEmployees);

// Delete an employee
router.delete('/employees/:id',isLoggedIn,authorize(["manager"]), employeeController.deleteEmployee);

module.exports = router;
