const express = require('express');
const router = express.Router();
const subsectorController = require('../controller/subSectorController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// Render the create form
router.get('/subsectors/create',isLoggedIn,authorize(["centralAdmin"]), subsectorController.renderCreateForm);

// Create a new subsector
router.post('/subsectors/create',isLoggedIn,authorize(["centralAdmin"]), subsectorController.createSubsector);

// Render the update form for a specific subsector
router.get('/subsectors/update/:id/',isLoggedIn,authorize(["centralAdmin"]), subsectorController.renderUpdateForm);

// Update a specific subsector
router.post('/subsectors/update/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.updateSubsector);

// Delete a specific subsector
router.get('/subsectors/delete/:id/',isLoggedIn,authorize(["centralAdmin"]), subsectorController.deleteSubsector);

// View details of a specific subsector

router.get('/subsectors/search', subsectorController.search)
router.get('/subsectors/:id',isLoggedIn,authorize(["centralAdmin"]), subsectorController.viewDetails);

// View all subsectors
router.get('/subsectors',isLoggedIn,authorize(["centralAdmin"]), subsectorController.viewAllSubsectors);


module.exports = router;
