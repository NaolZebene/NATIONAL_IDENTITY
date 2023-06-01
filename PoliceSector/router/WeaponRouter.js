const express = require('express');
const router = express.Router();
const multer = require('multer');
const weaponController = require('../controller/weaponController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorzation");

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Render the create form
router.get('/weapons/create',isLoggedIn,authorize(["admin","inventory"]), weaponController.renderCreateForm);

// Create a new weapon
router.post('/weapons/create',isLoggedIn,authorize(["admin","inventory"]), upload.array('additionalFiles'), weaponController.createWeapon);

// Render the update form for a specific weapon
router.get('/weapons/:id/update',isLoggedIn,authorize(["admin","inventory"]), weaponController.renderUpdateForm);

// Update a specific weapon
router.post('/weapons/:id',isLoggedIn,authorize(["admin","inventory"]), upload.array('additionalFiles'), weaponController.updateWeapon);

// Delete a specific weapon
router.post('/weapons/:id/delete',isLoggedIn,authorize(["admin","inventory"]), weaponController.deleteWeapon);

// View details of a specific weapon
router.get('/weapons/:id',isLoggedIn,authorize(["admin","inventory"]), weaponController.viewDetails);

// View all weapons
router.get('/weapons',isLoggedIn,authorize(["admin","inventory"]), weaponController.viewAllWeapons);

module.exports = router;
