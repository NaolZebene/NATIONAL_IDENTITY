const express = require('express');
const router = express.Router();
const multer = require('multer');
const weaponOwnershipController = require('../controller/weaponOwnershipController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorzation");

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Render the create form
router.get('/weaponOwnerships/create',isLoggedIn,authorize(["admin","inventory"]), weaponOwnershipController.renderCreateForm);

// Create a new weapon ownership
router.post('/weaponOwnerships/create',isLoggedIn,authorize(["admin","inventory"]), upload.array('additionalFiles'), weaponOwnershipController.createWeaponOwnership);

// Render the update form for a specific weapon ownership
router.get('/weaponOwnerships/:id/update',isLoggedIn,authorize(["admin","inventory"]), weaponOwnershipController.renderUpdateForm);

// Update a specific weapon ownership
router.post('/weaponOwnerships/:id/update',isLoggedIn,authorize(["admin","inventory"]), upload.array('additionalFiles'), weaponOwnershipController.updateWeaponOwnership);

// Delete a specific weapon ownership
router.post('/weaponOwnerships/:id/delete',isLoggedIn,authorize(["admin","inventory"]), weaponOwnershipController.deleteWeaponOwnership);

// View details of a specific weapon ownership
router.get('/weaponOwnerships/:id',isLoggedIn,authorize(["admin","inventory"]), weaponOwnershipController.viewDetails);

// View all weapon ownerships
router.get('/weaponOwnerships',isLoggedIn,authorize(["admin","inventory"]), weaponOwnershipController.viewAllWeaponOwnerships);

module.exports = router;
