const bcrypt = require('bcrypt');
const Subsector = require('../model/Subsector');

module.exports.loginForm = (req, res) => {
    
    res.render("subsectorAuth/login")
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Subsector.findOne({ email });
    console.log("here", user)
    if (!user) {
      return res.render('subsectorAuth/login', { message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.render('subsectorAuth/login', { message: 'Invalid email or password' });
    }

    // Store the user's ID and role in the session
    req.session.userId = user._id;
    req.session.role = user.role;

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports.logout = (req, res) => {
  // Clear the session data
  req.session.destroy();

  res.redirect('/subsector/login');
};

module.exports.forgotPasswordForm = (req, res) => {
    res.render("subsectorAuth/forgotPassword")
}
module.exports.forgotPassword = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by email
    const user = await Subsector.findOne({ email });

    if (!user) {
      return res.render('forgotPassword', { message: 'Email not found' });
    }

    // Compare the provided old password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.render('forgotPassword', { message: 'Incorrect old password' });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.render('forgotPassword', { message: 'New password and confirm password do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the new hashed password
    user.password = hashedPassword;

    // Save the updated user in the database
    await user.save();

    res.redirect('/subsector/login');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
