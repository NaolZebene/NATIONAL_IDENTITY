const express = require('express');
const router = express.Router();
const authController = require('../controller/subsectorAuth');

// Login routes
router.get('/subsector/login', authController.loginForm);
router.post('/subsector/login', authController.login);

// Logout route
router.get('/subsector/logout', authController.logout);

// Forgot password routes
router.get('/subsector/forgot-password', authController.forgotPasswordForm);
router.post('/subsector/forgot-password', authController.forgotPassword);

module.exports = router;
