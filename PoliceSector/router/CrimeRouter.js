const express = require('express');
const router = express.Router();
const multer = require('multer');
const crimeController = require('../controller/crimeController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorzation");
 
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Render the create form
router.get('/crimes/create',isLoggedIn,authorize(["employee","admin"]), crimeController.renderCreateForm);

// Create a new crime
router.post('/crimes/create',isLoggedIn,authorize(["employee","admin"]), upload.array('additionalFiles'), crimeController.createCrime);

// Render the update form for a specific crime
router.get('/crimes/:id/update',isLoggedIn,authorize(["employee","admin"]), crimeController.renderUpdateForm);

// Update a specific crime
router.post('/crimes/:id',isLoggedIn,authorize(["employee","admin"]), upload.array('additionalFiles'), crimeController.updateCrime);

// Delete a specific crime
router.post('/crimes/:id/delete',isLoggedIn,authorize(["employee","admin"]), crimeController.deleteCrime);

// View details of a specific crime
router.get('/crimes/:id',isLoggedIn,authorize(["employee","admin"]), crimeController.viewDetails);

// View all crimes
router.get('/crimes',isLoggedIn,authorize(["employee","admin"]), crimeController.viewAllCrimes);

module.exports = router;
