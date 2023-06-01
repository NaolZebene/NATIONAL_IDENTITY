const bcrypt = require('bcrypt');
const Employee = require('../model/Employee');

// Render create employee form
exports.renderCreateEmployeeForm = (req, res) => {
  res.render('employee/create-employee');
};

// Handle create employee form submission
exports.createEmployee = async (req, res) => {
  try {
    const { fullName, idNumber, role, email } = req.body;

    // Generate a hashed password with a salt of 10
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('123456', saltRounds);

    // Create a new employee instance
    const employee = new Employee({
      fullName,
      idNumber,
      role,
      password: hashedPassword,
      email
    });

    // Save the employee to the database
    await employee.save();

    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render employee details
exports.renderEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.render('employee/view-details', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render all employees
exports.renderAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    res.render('employee/view-all-employees', { employees });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render edit employee form
exports.renderEditEmployeeForm = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.render('employee/update-employee', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Handle edit employee form submission
exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, idNumber, role, email } = req.body;

    // Find the employee by ID and update the fields
    const employee = await Employee.findByIdAndUpdate(
      id,
      { fullName, idNumber, role, email },
      { new: true }
    );

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee by ID and remove it
    const employee = await Employee.findByIdAndRemove(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
