const bcrypt = require('bcrypt');
const Employee = require('../model/Employees');


// Render the login form
exports.renderLoginForm = (req, res) => {
  res.render('Auth/login');
};

// Process login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.render('Auth/login', { error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.render('Auth/login', { error: 'Invalid email or password' });
    }

    // Store employee data in session
    req.session.user = employee;

    if(employee.role == "admin" || employee.role == "centralAdmin"){
       return res.redirect('/dashboard');
    }
    if(employee.role == 'card' || employee.role == "doctor"){
      return res.redirect('/requests');
    }
    if(employee.role == 'ctscan'){
      return res.redirect('/requests/ctScanResult');
    }
    if(employee.role == 'ultrasound'){
      return res.redirect('/requests/ultraSound');
    }
    if(employee.role == 'xray'){
      return res.redirect('/requests/x-ray');
    }
    if(employee.role == "pharmacist"){
      return res.redirect("/drugs")
    }

    if(employee.role == "lab_tech"){
      return res.redirect("/laboratorySamples")
    }
    
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

// Render the change password form
exports.renderChangePasswordForm = (req, res) => {
  res.render('Auth/change-password');
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const employee = req.session.employee;

    const passwordMatch = await bcrypt.compare(currentPassword, employee.password);

    if (!passwordMatch) {
      return res.render('Auth/change-password', { error: 'Invalid current password' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    employee.password = hashedPassword;
    await employee.save();

   
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
