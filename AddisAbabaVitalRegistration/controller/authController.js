const bcrypt = require('bcrypt');
const Employee = require('../model/Employee');

// Render login form
exports.renderLogin = (req, res) => {
  res.render('auth/login');
};

// Handle login form submission
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    // Store the user's ID in the session
    req.session.user = employee;
    req.session.role = employee.role;

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render change password form
exports.renderChangePassword = (req, res) => {
  res.render('auth/change-password');
};

// Handle change password form submission
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    // Retrieve the user from the database
    const employee = await Employee.findById(userId);

    if (!employee) {
      return res.render('error', { message: 'User not found' });
    }

    // Compare the provided current password with the hashed password in the database
    const isMatch = await bcrypt.compare(currentPassword, employee.password);

    if (!isMatch) {
      return res.render('auth/change-password', { error: 'Current password is incorrect' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password in the database
    employee.password = hashedPassword;
    await employee.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  // Clear the session
  req.session.destroy();

  res.redirect('/login');
};

module.exports = exports;
