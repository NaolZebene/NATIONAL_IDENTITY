const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

// Render the login form
router.get('/login', authController.renderLoginForm);

// Process login
router.post('/login', authController.login);

// Render the change password form
router.get('/change-password', authController.renderChangePasswordForm);

// Process change password
router.post('/change-password', authController.changePassword);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
