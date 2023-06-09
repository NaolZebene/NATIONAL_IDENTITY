const fs = require('fs');
const Weapon = require('../model/Weapon');

// Render the create form
exports.renderCreateForm = (req, res) => {
  res.render('Weapon/create-weapon');
};

// Create a new weapon
exports.createWeapon = async (req, res) => {
  try {
    const { weaponName, weaponAmount, weaponSerialNumber } = req.body;
    const weapon = new Weapon({
      weaponName,
      weaponAmount,
      weaponSerialNumber,
      sector_to:req.session.user.sector_id
    });

    if (req.files && req.files.length > 0) {
      weapon.additionalFiles = req.files.map((file) => ({ filePath: file.path }));
    }

    await weapon.save();
    res.redirect('/weapons');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Render the update form for a specific weapon
exports.renderUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const weapon = await Weapon.findById(id);

    if (!weapon) {
      return res.render('error', { message: 'Weapon not found' });
    }

    res.render('Weapon/update-weapon', { weapon });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Update a specific weapon
exports.updateWeapon = async (req, res) => {
  try {
    const { id } = req.params;
    const { weaponName, weaponAmount, weaponSerialNumber } = req.body;

    const weapon = await Weapon.findById(id);

    if (!weapon) {
      return res.render('error', { message: 'Weapon not found' });
    }

    weapon.weaponName = weaponName;
    weapon.weaponAmount = weaponAmount;
    weapon.weaponSerialNumber = weaponSerialNumber;

    if (req.files && req.files.length > 0) {
      weapon.additionalFiles = req.files.map((file) => ({ filePath: file.path }));
    }

    await weapon.save();
    res.redirect('/weapons');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// Delete a specific weapon
exports.deleteWeapon = async (req, res) => {
  try {
    const { id } = req.params;
    const weapon = await Weapon.findById(id);

    if (!weapon) {
      return res.render('error', { message: 'Weapon not found' });
    }

    if (weapon.additionalFiles && weapon.additionalFiles.length > 0) {
      // Delete additional files associated with the weapon
      for (const file of weapon.additionalFiles) {
        // Delete the file from the file system using the file path
        fs.unlinkSync(file.filePath);
      }
    }

    await Weapon.findByIdAndRemove(id);
    res.redirect('/weapons');
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View details of a specific weapon
exports.viewDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const weapon = await Weapon.findById(id);

    if (!weapon) {
      return res.render('error', { message: 'Weapon not found' });
    }

    res.render('Weapon/view-details', { weapon });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

// View all weapons
exports.viewAllWeapons = async (req, res) => {
  try {
    const weapons = await Weapon.find({sector_to:req.session.user.sector_id});
    res.render('Weapon/view-all-weapons', { weapons });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Server Error' });
  }
};

module.exports = exports;
