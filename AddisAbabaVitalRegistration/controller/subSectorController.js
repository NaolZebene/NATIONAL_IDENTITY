const bcrypt = require('bcrypt');

const Subsector = require('../model/Subsector');

const Employee = require("../model/Employee")

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('subsector/create-subsector');
};

// Create a new subsector
exports.createSubsector = async (req, res) => {
  try {
    const { subsectorName, location, username, email } = req.body;
    const password = '123456'; // Default password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const subsector = new Subsector({
      subsectorName,
      location,
      username,
      password: hashedPassword
    });

    const adminAccount = new Employee({
      fullName:subsectorName,
      role:"admin",
      password:hashedPassword,
      email,
      sector_id:subsector._id
    })

    await subsector.save();
    await adminAccount.save();
    res.redirect('/subsector');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific subsector
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const subsector = await Subsector.findById(id);

    if (!subsector) {
      return res.render('error', { message: 'Subsector not found' });
    }

    res.render('subsector/update-subsector', { subsector });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific subsector
exports.updateSubsector = async (req, res) => {
  try {
    const { id } = req.params;
    const { subsectorName, location, username } = req.body;

    const subsector = await Subsector.findById(id);

    if (!subsector) {
      return res.render('error', { message: 'Subsector not found' });
    }

    subsector.subsectorName = subsectorName;
    subsector.location = location;
    subsector.username = username;

    await subsector.save();
    res.redirect('/subsector');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific subsector
exports.deleteSubsector = async (req, res) => {
  try {
    const { id } = req.params;
    await Subsector.findByIdAndRemove(id);
    res.redirect('/subsector');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific subsector
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const subsector = await Subsector.findById(id);

    if (!subsector) {
      return res.render('error', { message: 'Subsector not found' });
    }

    res.render('subsector/view-details', { subsector });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all subsectors
exports.viewAllSubsectors = async (req, res) => {
  try {
    const subsectors = await Subsector.find();
    res.render('subsector/view-all-subsectors', { subsectors });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
