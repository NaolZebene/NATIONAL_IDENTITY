const bcrypt = require('bcrypt');
const Subsector = require('../model/Subsector');
const Employee = require('../model/Employees');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Subsector/create-subsector');
};

// Create a new subsector
exports.createSubsector = async (req, res) => {
  try {
    const { name, location, email, username } = req.body;
    const defaultPassword = '123456';

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const subsector = new Subsector({
      name,
      location,
      email,
      username,
      password: hashedPassword,
      role: 'sub_organization'
    });

    const adminEmployee = new Employee({
      fullName: name, 
      email: email,
      username: username,
      password:hashedPassword, 
      sector_id: subsector._id,
      role:"admin"
    });

    await subsector.save();
    await adminEmployee.save();
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
    const { name, location, email, username } = req.body;

    const subsector = await Subsector.findById(id);

    if (!subsector) {
      return res.render('error', { message: 'Subsector not found' });
    }

    subsector.name = name;
    subsector.location = location;
    subsector.email = email;
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

    res.render('Subsector/view-subsector', { subsector });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all subsectors
exports.viewAllSubsectors = async (req, res) => {
  try {
    const subsectors = await Subsector.find();
    res.render('Subsector/view-subsectors', { subsectors });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports.search = async (req, res) => {
  try {
    const query = req.query.query; // Get the search query from the request query parameters

    // Perform the search operation based on the query using the Subsector model
    const results = await Subsector.find({ name: { $regex: query, $options: 'i' } });

    // Extract the name property from the search results
    // const formattedResults = results.map((result) => result.name);

    // Send the search results as a response
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
