const bcrypt = require('bcrypt');
const Subsector = require('../model/Subsector');
const Employee = require('../model/Employee');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Subsector/create-subsector');
};

// Create a new subsector
exports.createSubsector = async (req, res) => {
  try {
    const { subsectorName, location, username, email } = req.body;
    const password = '123456';

    const hashedPassword = await bcrypt.hash(password, 10);

    const subsector = new Subsector({
      subsectorName,
      location,
      username,
      email,
      password: hashedPassword,
    });

    const subsectorAdminAccount = new Employee({
      name: subsectorName, 
      email:email,
      role:"admin",
      password:hashedPassword, 
      sector_id:subsector._id
    })

    await subsector.save();
    await subsectorAdminAccount.save();
    
    res.redirect('/subsectors');
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

    res.render('Subsector/update-subsector', { subsector });
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
    res.redirect('/subsectors');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific subsector
exports.deleteSubsector = async (req, res) => {
  try {
    const { id } = req.params;
    const subsector = await Subsector.findById(id);

    if (!subsector) {
      return res.render('error', { message: 'Subsector not found' });
    }

    await Subsector.findByIdAndRemove(id);
    res.redirect('/subsectors');
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

    res.render('Subsector/subsector-details', { subsector });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all subsectors
exports.viewAllSubsectors = async (req, res) => {
  try {
    const subsectors = await Subsector.find();
    res.render('Subsector/view-all-subsectors', { subsectors });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
