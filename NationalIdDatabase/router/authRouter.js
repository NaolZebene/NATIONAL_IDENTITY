const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authController'); // Replace with the correct path to the authentication controller

// Login route
router.get("/login", authenticationController.renderLogin)
router.post('/login', authenticationController.login);

router.get('/logout', authenticationController.logout);

// Change password route
router.post('/change-password', authenticationController.changePassword);

module.exports = router;
