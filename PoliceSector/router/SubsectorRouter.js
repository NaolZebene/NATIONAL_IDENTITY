const express = require('express');
const router = express.Router();
const subsectorController = require('../controller/subsectorController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorzation");

// Render the create form
router.get('/subsectors/create',isLoggedIn,authorize(["admin"]), subsectorController.renderCreateForm);

// Create a new subsector
router.post('/subsectors/create',isLoggedIn,authorize(["admin"]), subsectorController.createSubsector);

// Render the update form for a specific subsector
router.get('/subsectors/:id/update',isLoggedIn,authorize(["admin"]), subsectorController.renderUpdateForm);

// Update a specific subsector
router.post('/subsectors/:id/update',isLoggedIn,authorize(["admin"]), subsectorController.updateSubsector);

// Delete a specific subsector
router.post('/subsectors/:id/delete',isLoggedIn,authorize(["admin"]), subsectorController.deleteSubsector);

// View details of a specific subsector
router.get('/subsectors/:id',isLoggedIn,authorize(["admin"]), subsectorController.viewDetails);

// View all subsectors
router.get('/subsectors',isLoggedIn,authorize(["admin"]), subsectorController.viewAllSubsectors);

module.exports = router;
