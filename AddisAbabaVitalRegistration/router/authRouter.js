const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Render login form
router.get('/login', authController.renderLogin);

// Handle login form submission
router.post('/login', authController.login);

// Render change password form
router.get('/change-password', authController.renderChangePassword);

// Handle change password form submission
router.post('/change-password', authController.changePassword);

// Handle logout
router.get('/logout', authController.logout);

module.exports = router;
