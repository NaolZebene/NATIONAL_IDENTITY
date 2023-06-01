const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")
// Render the create form
router.get('/requests/create',isLoggedIn,authorize(["card"]), requestController.renderCreateForm);

// Create a new request
router.post('/requests',isLoggedIn,authorize(["card"]), requestController.createRequest);

// Render the update form for a specific request
// router.get('/request/:id/edit',isLoggedIn,authorize(['card']), requestController.renderUpdateForm);

// Update a specific request
// router.post('/requests/:id/update',isLoggedIn,authorize(['card']), requestController.updateRequest);

// Delete a specific request
router.get('/request/delete/:id/',isLoggedIn,authorize(['card']), requestController.deleteRequest);

// View all requests
router.get('/requests',isLoggedIn,authorize(['admin', 'doctor', "card"]), requestController.viewAll);
// View details of a specific request
router.get('/requests/:id',isLoggedIn,authorize(['admin','doctor', "card"]), requestController.viewDetails);



module.exports = router;
