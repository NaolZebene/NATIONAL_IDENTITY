const Crime = require('../model/Crime');

// Render the create form
module.exports.renderCreateForm = (req, res) => {
  res.render('Crime/create-crime');
};

// Create a new crime
module.exports.createCrime = async (req, res) => {
  try {
    const { fileNumber, criminalName, criminalIdNumber, crimeCommittedPlace, crimeDescription, crimeType, victimName, victimId } = req.body;
    const crime = new Crime({
      fileNumber,
      criminalName,
      criminalIdNumber,
      crimeCommittedPlace,
      crimeDescription,
      crimeType,
      victimName,
      victimId,
      sector_reg:req.session.user.sector_id
    });
    console.log(req.body)
    if (req.files && req.files.length > 0) {
      crime.additionalFiles = req.files.map(file => ({ file_path: file.path }));
    }

    await crime.save();
    res.redirect('/crimes');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific crime
module.exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const crime = await Crime.findById(id);

    if (!crime) {
      return res.render('error', { message: 'Crime not found' });
    }

    res.render('Crime/update-crime', { crime });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific crime
module.exports.updateCrime = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileNumber, criminalName, criminalIdNumber, crimeCommittedPlace, crimeDescription, crimeType, victimName, victimId } = req.body;

    const crime = await Crime.findById(id);

    if (!crime) {
      return res.render('error', { message: 'Crime not found' });
    }

    crime.fileNumber = fileNumber;
    crime.criminalName = criminalName;
    crime.criminalIdNumber = criminalIdNumber;
    crime.crimeCommittedPlace = crimeCommittedPlace;
    crime.crimeDescription = crimeDescription;
    crime.crimeType = crimeType;
    crime.victimName = victimName;
    crime.victimId = victimId;

    if (req.files && req.files.length > 0) {
      crime.additionalFiles = req.files.map(file => ({ file_path: file.path }));
    }

    await crime.save();
    res.redirect('/crimes');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific crime
module.exports.deleteCrime = async (req, res) => {
  try {
    const { id } = req.params;
    const crime = await Crime.findById(id);

    if (!crime) {
      return res.render('error', { message: 'Crime not found' });
    }

    if (crime.additionalFiles && crime.additionalFiles.length > 0) {
      // Delete additional files associated with the crime
      for (const file of crime.additionalFiles) {
        // Delete the file from the file system using the file path
        // Implement the logic to delete the file from the file system here
      }
    }

    await Crime.findByIdAndRemove(id);
    res.redirect('/crimes');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific crime
module.exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const crime = await Crime.findById(id);

    if (!crime) {
      return res.render('error', { message: 'Crime not found' });
    }

    res.render('Crime/view-details', { crime });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all crimes
module.exports.viewAllCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find({sector_reg:req.session.user.sector_id});
    res.render('Crime/view-all-crimes', { crimes });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};
