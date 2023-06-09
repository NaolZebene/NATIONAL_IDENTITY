const fs = require('fs');
const WeaponOwnership = require('../model/WeaponOwnership');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('weaponOwnership/create-weapon-ownership');
};

// Create a new weapon ownership
exports.createWeaponOwnership = async (req, res) => {
  try {
    const { weaponSerialNumber, ownerName, ownerIdNumber, fingerprint } = req.body;
    const weaponOwnership = new WeaponOwnership({
      weaponSerialNumber,
      ownerName,
      ownerIdNumber,
      fingerprint,
      sector_created:req.session.user.sector_id
    });

    if (req.files && req.files.length > 0) {
      weaponOwnership.additionalFiles = req.files.map((file) => ({ filePath: file.path }));
    }

    await weaponOwnership.save();
    res.redirect('/weaponOwnerships');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific weapon ownership
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const weaponOwnership = await WeaponOwnership.findById(id);

    if (!weaponOwnership) {
      return res.render('error', { message: 'Weapon ownership not found' });
    }

    res.render('weaponOwnership/update-weapon-ownership', { weaponOwnership });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific weapon ownership
exports.updateWeaponOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const { weaponSerialNumber, ownerName, ownerIdNumber, fingerprint } = req.body;

    const weaponOwnership = await WeaponOwnership.findById(id);

    if (!weaponOwnership) {
      return res.render('error', { message: 'Weapon ownership not found' });
    }

    weaponOwnership.weaponSerialNumber = weaponSerialNumber;
    weaponOwnership.ownerName = ownerName;
    weaponOwnership.ownerIdNumber = ownerIdNumber;
    weaponOwnership.fingerprint = fingerprint;

    if (req.files && req.files.length > 0) {
      weaponOwnership.additionalFiles = req.files.map((file) => ({ filePath: file.path }));
    }

    await weaponOwnership.save();
    res.redirect('/weaponOwnerships');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific weapon ownership
exports.deleteWeaponOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const weaponOwnership = await WeaponOwnership.findById(id);

    if (!weaponOwnership) {
      return res.render('error', { message: 'Weapon ownership not found' });
    }

    if (weaponOwnership.additionalFiles && weaponOwnership.additionalFiles.length > 0) {
      // Delete additional files associated with the weapon ownership
      for (const file of weaponOwnership.additionalFiles) {
        // Delete the file from the file system using the file path
        fs.unlinkSync(file.filePath);
      }
    }

    await WeaponOwnership.findByIdAndRemove(id);
    res.redirect('/weaponOwnerships');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific weapon ownership
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const weaponOwnership = await WeaponOwnership.findById(id);

    if (!weaponOwnership) {
      return res.render('error', { message: 'Weapon ownership not found' });
    }

    res.render('weaponOwnership/view-details', { weaponOwnership });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all weapon ownerships
exports.viewAllWeaponOwnerships = async (req, res) => {
  try {
    const weaponOwnerships = await WeaponOwnership.find({sector_created:req.session.user.sector_id});
    res.render('weaponOwnership/view-all-weapon-ownerships', { weaponOwnerships });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
