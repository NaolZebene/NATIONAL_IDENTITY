const bcrypt = require('bcrypt');
const Users = require('../model/Users'); // Replace with the correct path to the Users model

// Login function

const renderLogin = async (req, res)=>{
    return res.render("auth/login");
}
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.session.userId = user.fullname;
    req.session.role = user.role
    console.log(req.session)

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout function
const logout = (req, res) => {
  req.session.userId = null;
  return res.redirect("/login")
};

// Change password function
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.userId;

  try {
    // Find the user by ID
    const user = await Users.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided current password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    // Check if the current password is correct
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, logout, changePassword,renderLogin };
