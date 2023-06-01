const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestHandlingController');
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Render edit request form for doctor
router.get('/requests/doctoredit/:id/',isLoggedIn,authorize(["doctor"]), requestController.editRequestByDoctorRender);

// Update request by doctor
router.post('/requests/doctoredit/:id/',isLoggedIn,authorize(["doctor"]), requestController.editRequestByDoctor);

// Render CT scan result form
router.get('/requests/ctscanResult/:id',isLoggedIn,authorize(["ctscan"]), requestController.ctscanResultRender);

// Update CT scan result

router.get("/requests/ctScanResult",isLoggedIn,authorize(["ctscan"]), requestController.ctScanView);
router.post('/requests/ctscanResult/:id/',isLoggedIn,authorize(["ctscan"]),upload.single('ctscan_image'), requestController.ctscanResult);

// Render ultrasound form
router.get('/requests/ultraSound/:id/',isLoggedIn,authorize(["ultrasound"]), requestController.ultraSoundRender);

// Update ultrasound
router.get("/requests/ultraSound",isLoggedIn,authorize(["ultrasound"]), requestController.ultraSoundView)
router.post('/requests/ultraSound/:id/',isLoggedIn,authorize(["ultrasound"]),upload.single('ultraSound_image'), requestController.ultraSound);

// Render X-ray form
router.get("/requests/x-ray",isLoggedIn,authorize(["xray"]), requestController.xrayView)
router.get('/requests/x-ray/:id/',isLoggedIn,authorize(["xray"]), requestController.x_rayRender);

// Update X-ray
router.post('/requests/x-ray/:id/',isLoggedIn,authorize(["xray"]),upload.single('x_ray_image'), requestController.x_ray);

module.exports = router;
