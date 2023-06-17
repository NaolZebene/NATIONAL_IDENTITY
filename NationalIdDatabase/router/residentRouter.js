const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const residentsController = require('../controller/residentController');

const {isLoggedIn} = require("../util/isLoggedin")
// Render the create resident form
router.get('/residents/create',isLoggedIn, residentsController.renderCreateForm);

// Create a new resident
router.post('/residents/create',isLoggedIn, upload.single('document'), residentsController.createResident);

// Render the edit resident form
router.get('/residents/edit/:id/',isLoggedIn, residentsController.renderEditForm);

// Update a resident
router.post('/residents/edit/:id/',isLoggedIn, upload.single('document'), residentsController.updateResident);

// Render the view resident form
router.get('/residents/:id',isLoggedIn, residentsController.renderViewOneForm);

// Render the view all residents form
router.get('/residents/',isLoggedIn, residentsController.renderViewAllForm);

module.exports = router;
