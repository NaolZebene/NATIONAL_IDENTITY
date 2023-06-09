const express = require('express');
const router = express.Router();
const subsectorController = require('../controller/subSectorController');
const {isLoggedIn} = require("../util/isLoggedIn")

const {authorize} = require("../util/Authorization")
// Render the create form
router.get('/subsector/create',isLoggedIn,authorize(["centralAdmin"]), subsectorController.renderCreateForm);

// Create a new subsector
router.post('/subsector/create',isLoggedIn,authorize(["centralAdmin"]), subsectorController.createSubsector);

// Render the update form for a specific subsector
router.get('/subsector/update/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.renderUpdateForm);

// Update a specific subsector
router.post('/subsector/update/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.updateSubsector);

// Delete a specific subsector
router.post('/subsector/delete/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.deleteSubsector);

// View details of a specific subsector
router.get('/subsector/view/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.viewDetails);

// View all subsectors
router.get('/subsector',isLoggedIn,authorize(["centralAdmin"]), subsectorController.viewAllSubsectors);

module.exports = router;
