const express = require('express');
const router = express.Router();
const laboratorySampleController = require('../controller/laboratorySamplesController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// Render the create form
router.get('/laboratorySamples/create/:id', laboratorySampleController.renderCreateForm);

// Create a new laboratory sample
router.post('/laboratorySamples/create/:id', laboratorySampleController.createLaboratorySample);

// Render the update form for a specific laboratory sample
router.get('/laboratorySamples/update/:id', laboratorySampleController.renderUpdateForm);

// Update a specific laboratory sample
router.post('/laboratorySamples/update/:id', laboratorySampleController.updateLaboratorySample);

// Delete a specific laboratory sample
router.post('/laboratorySamples/delete/:id', laboratorySampleController.deleteLaboratorySample);

// View details of a specific laboratory sample


// View all laboratory samples
router.get('/laboratorySamples', laboratorySampleController.viewAllLaboratorySamples);
router.get('/laboratorySamples/:id', laboratorySampleController.viewDetails);

module.exports = router;
