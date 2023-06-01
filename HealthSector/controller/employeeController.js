const bcrypt = require('bcrypt');
const Employee = require('../model/Employees');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Employees/create-employee');
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { fullName, idNumber, email, username, role } = req.body;
    const password = '123456'; // Default password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const employee = new Employee({
      fullName,
      idNumber,
      email,
      username,
      password: hashedPassword,
      role,
      sector_id:req.session.user.sector_id
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

    res.render('Employees/update-employee', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, idNumber, email, username, role } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.render('error', { message: 'Employee not found' });
    }

    employee.fullName = fullName;
    employee.idNumber = idNumber;
    employee.email = email;
    employee.username = username;
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

    res.render('Employees/view-details', { employee });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all employees
exports.viewAllEmployees = async (req, res) => {
  try {
    const subsector = req.session.user.sector_id;
    const employees = await Employee.find({sector_id:subsector});
    res.render('Employees/view-all-employees', { employees });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
