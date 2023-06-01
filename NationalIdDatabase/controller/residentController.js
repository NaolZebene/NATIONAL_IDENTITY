const bcrypt = require('bcrypt');
const Resident = require('../model/Resident');

// Render create resident form
exports.renderCreateResidentForm = (req, res) => {
  res.render('residents/create-resident');
};

// Handle create resident form submission
exports.createResident = async (req, res) => {
  try {
    const {
      name,
      location,
      phoneNumber,
      idNumber,
      maritalStatus,
      job,
      birthday,
      emergencyCall,
      nationality,
      emergencyPersonName,
      homeNumber
    } = req.body;

    // Hash the default password
    const saltRounds = 10;
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

    // Retrieve the uploaded files
    const image  = req.file;
    console.log(image)
    // const path = image.path
    // Create a new resident instance
    const resident = new Resident({
      name,
      location,
      phoneNumber,
      idNumber,
      maritalStatus,
      job,
      birthday,
      emergencyCall,
      nationality,
      emergencyPersonName,
      password: hashedPassword,
      homeNumber,
      image : image.path
    });
    console.log(resident)

    // Save the resident to the database
    await resident.save();

    res.redirect('/residents');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render edit resident form
exports.renderEditResidentForm = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resident by ID
    const resident = await Resident.findById(id);

    if (!resident) {
      return res.render('error', { message: 'Resident not found' });
    }

    res.render('residents/edit-resident', { resident });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Handle edit resident form submission
exports.editResident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      phoneNumber,
      idNumber,
      maritalStatus,
      job,
      birthday,
      emergencyCall,
      nationality,
      emergencyPersonName,
      homeNumber
    } = req.body;

    // Find the resident by ID and update the fields
    const resident = await Resident.findByIdAndUpdate(
      id,
      {
        name,
        location,
        phoneNumber,
        idNumber,
        maritalStatus,
        job,
        birthday,
        emergencyCall,
        nationality,
        emergencyPersonName,
        homeNumber
      },
      { new: true }
    );

    if (!resident) {
      return res.render('error', { message: 'Resident not found' });
    }

    res.redirect('/residents');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a resident
exports.deleteResident = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resident by ID and remove it
    const resident = await Resident.findByIdAndRemove(id);

    if (!resident) {
      return res.render('error', { message: 'Resident not found' });
    }

    res.redirect('/residents');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render resident details
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resident by ID
    const resident = await Resident.findById(id);

    if (!resident) {
      return res.render('error', { message: 'Resident not found' });
    }

    res.render('residents/resident-details', { resident });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render all residents
exports.viewAllResidents = async (req, res) => {
  try {
    // Retrieve all residents from the database
    const residents = await Resident.find();

    res.render('residents/all-residents', { residents });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
