const express = require('express');
const router = express.Router();
const { renderLogin, login, logout, renderChangePassword, changePassword } = require('../controller/authController');

// Render login form
router.get('/login', renderLogin);

// Handle login
router.post('/login', login);

// Handle logout
router.get('/logout', logout);

// Render change password form
router.get('/change-password', renderChangePassword);

// Handle change password
router.post('/change-password', changePassword);

module.exports = router;
