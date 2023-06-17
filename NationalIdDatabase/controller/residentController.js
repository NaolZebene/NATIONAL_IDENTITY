const bcrypt = require('bcrypt');
const Resident = require('../model/Resident');
const Flow = require("../model/flow")

async function renderCreateForm(req, res) {
  const idx = await Flow.findOne({_id: 0});
  res.render('residents/create-resident', {pos : idx.currentIdx});
}

async function renderEditForm(req, res) {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }
    res.render('residents/edit-resident', { resident });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the resident' });
  }
}


async function renderViewOneForm(req, res) {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }
    res.render('residents/resident-details', { resident });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the resident' });
  }
}

async function renderViewAllForm(req, res) {
  try {
    const residents = await Resident.find();
    res.render('residents/all-residents', { residents });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving residents' });
  }
}

async function createResident(req, res) {
  const default_pass = "123456"
  try{
    const {
      name,
      location,
      fingerprintin1,
      fingerprintin2,
      fingerprintin3,
      fingerprintin4,
      fingerprintin5,
      fatherName,
      motherName,
      birthPlace,
      phoneNumber,
      idNumber,
      image,
      maritalStatus,
      job,
      birthday,
      emergencyCall,
      nationality,
      emergencyPersonName,
      homeNumber,
      email
    } = req.body;
    
    try {
      // Check if a resident with the same email already exists
      const existingResident = await Resident.findOne({ email: req.body.email });
    
      if (existingResident) {
        // A resident with the same email already exists
        return res.status(409).json({ message: 'Email is already registered.' });
      }
    
      // Hash the default password using bcrypt
      const hashedPassword = await bcrypt.hash('123456', 10);
    
      const pos = await Flow.findOne({_id:0})
      // Create a new resident object
      const fdata = [
        {
          ifingerprint:pos.currentIdx,
          img_path:fingerprintin1, 
        },
        {
          ifingerprint:pos.currentIdx+1,
          img_path:fingerprintin2
        }, 
        {
          ifingerprint:pos.currentIdx+2,
          img_path:fingerprintin3
        }, 
        {
          ifingerprint:pos.currentIdx+3, 
          img_path:fingerprintin3
        },
        {
        ifingerprint:pos.currentIdx+4,
        img_path:fingerprintin4
        }, 
        {
          ifingerprint:pos.currentIdx+5,
          img_path:fingerprintin5
        }
      ]
      const newResident = new Resident({
        name,
        email,
        location,
        fingerprint_uniq:fdata,
        fatherName,
        motherName,
        birthPlace,
        phoneNumber,
        idNumber,
        image,
        maritalStatus,
        job,
        birthday,
        idNumber:pos,
        emergencyCall,
        nationality,
        emergencyPersonName,
        homeNumber,
        password: hashedPassword // Set the hashed password
      });
      pos.currentIdx = pos.currentIdx + 5;
      // Save the new resident to the database
      await newResident.save();
      await pos.save();
      // Resident saved successfully
      return res.redirect("/residents")
    } catch (error) {
      // Handle any error that occurred
      console.log(error)
      return res.status(500).json({ message: 'An error occurred while registering the resident.' });
    }

  }catch(e){
    return res.render("error", {message:e});
  }
}

async function updateResident(req, res) {
  try {
    const {
      name,
      location,
      fingerprintin1,
      fingerprintin2,
      fingerprintin3,
      fingerprintin4,
      fingerprintin5,
      fatherName,
      motherName,
      birthPlace,
      phoneNumber,
      image,
      maritalStatus,
      job,
      birthday,
      emergencyCall,
      nationality,
      emergencyPersonName,
      homeNumber, 
      email
    } = req.body;

    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }


    const fdata = [
      {
        ifingerprint:resident.fingerprint_uniq[0].ifingerpint,
        img_path:fingerprintin1, 
      },
      {
        ifingerprint:resident.fingerprint_uniq[1].ifingerpint,
        img_path:fingerprintin2
      }, 
      {
        ifingerprint:resident.fingerprint_uniq[2].ifingerpint,
        img_path:fingerprintin3
      }, 
      {
      ifingerprint:resident.fingerprint_uniq[3].ifingerpint,
      img_path:fingerprintin4
      }, 
      {
        ifingerprint:resident.fingerprint_uniq[4].ifingerpint,
        img_path:fingerprintin5
      }
    ]

    resident.name = name;
    resident.location = location;
    resident.fingerprint_uniq = fdata;
    resident.fatherName = fatherName;
    resident.motherName = motherName;
    resident.birthPlace = birthPlace;
    resident.phoneNumber = phoneNumber;
    resident.image = image;
    resident.maritalStatus = maritalStatus;
    resident.job = job;
    resident.birthday = birthday;
    resident.emergencyCall = emergencyCall;
    resident.nationality = nationality;
    resident.emergencyPersonName = emergencyPersonName;
    resident.homeNumber = homeNumber;
    resident.email = email;

    await resident.save();

    res.redirect('/residents');
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while updating the resident' });
  }
}

async function deleteResident(req, res) {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ error: 'Resident not found' });
    }

    await resident.remove();

    res.redirect('/residents');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the resident' });
  }
}

module.exports = {
  renderCreateForm,
  renderEditForm,
  renderViewOneForm,
  renderViewAllForm,
  createResident,
  updateResident,
  deleteResident
};
