const bcrypt = require('bcrypt');
const Employee = require('../model/Employee');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Employee/create-employee');
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, fingerprint, idNumber, role } = req.body;
    const password = '123456'; // Default password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const employee = new Employee({
      name,
      email,
      fingerprint,
      idNumber,
      role,
      password: hashedPassword
    });

    await employee.save();
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific employee
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.render('Employee/update-employee', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, fingerprint, idNumber, role } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    employee.name = name;
    employee.email = email;
    employee.fingerprint = fingerprint;
    employee.idNumber = idNumber;
    employee.role = role;

    await employee.save();
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    await Employee.findByIdAndRemove(id);
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific employee
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    res.render('Employee/view-details', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all employees
exports.viewAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('Employee/view-all-employees', { employees });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
