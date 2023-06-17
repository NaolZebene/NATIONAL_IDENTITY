const express = require('express');
const router = express.Router();
const referralController = require('../controller/referallController');
const { isLoggedIn }  = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// Render the create form
router.get('/referrals/create',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.renderCreateForm);

// Create a new referral
router.post('/referrals/create',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.createReferral);

// Render the update form for a specific referral
router.get('/referrals/update/:id',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.renderUpdateForm);

// Update a specific referral
router.post('/referrals/update/:id',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.updateReferral);

// Delete a specific referral
router.post('/referrals/delete/:id',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.deleteReferral);

// View details of a specific referral
router.get('/referrals/details/:id',isLoggedIn,authorize(["admin", "card", "doctor"]), referralController.viewDetails);

// View all referrals
router.get('/referrals/',isLoggedIn, referralController.viewAllReferrals);

router.get("/referrals/escalate/:id", isLoggedIn ,authorize(["admin", "card", "doctor"]), referralController.EscalateToDoctors)



module.exports = router;
