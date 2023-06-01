const express = require('express');
const router = express.Router();
const multer = require('multer'); // Don't forget to require Multer

// Import the controller
const residentController = require('../controller/residentController');

// Set up Multer storage and file limits for image upload
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/'); // Set the destination folder for image files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + file.originalname; // Keep the file extension intact
    cb(null, filename); // Set the file name for image files
  },
});

// Set up Multer storage and file limits for additional file upload


const uploadImage = multer({
  storage: imageStorage,
}).single('image'); // Specify the field name for image upload


// Render create resident form
router.get('/residents/create', residentController.renderCreateResidentForm);

// Handle create resident form submission
router.post('/residents/create', uploadImage, residentController.createResident);

// Render edit resident form
router.get('/residents/edit/:id', residentController.renderEditResidentForm);

// Handle edit resident form submission
router.post('/residents/edit/:id', uploadImage, residentController.editResident);

// Delete a resident
router.get('/residents/delete/:id', residentController.deleteResident);

// Render resident details
router.get('/residents/view/:id', residentController.viewDetails);

// Render all residents
router.get('/residents/', residentController.viewAllResidents);

module.exports = router;
