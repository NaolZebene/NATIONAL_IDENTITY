const express = require('express');
const router = express.Router();
const requestController = require('../controller/requestHandlingController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Render edit request form for doctor
router.get('/requests/doctoredit/:id/', requestController.editRequestByDoctorRender);

// Update request by doctor
router.post('/requests/doctoredit/:id/', requestController.editRequestByDoctor);

// Render CT scan result form
router.get('/requests/ctscanResult/:id', requestController.ctscanResultRender);

// Update CT scan result

router.get("/requests/ctScanResult", requestController.ctScanView);
router.post('/requests/ctscanResult/:id/',upload.single('ctscan_image'), requestController.ctscanResult);

// Render ultrasound form
router.get('/requests/ultraSound/:id/', requestController.ultraSoundRender);

// Update ultrasound
router.get("/requests/ultraSound", requestController.ultraSoundView)
router.post('/requests/ultraSound/:id/',upload.single('ultraSound_image'), requestController.ultraSound);

// Render X-ray form
router.get("/requests/x-ray", requestController.xrayView)
router.get('/requests/x-ray/:id/', requestController.x_rayRender);

// Update X-ray
router.post('/requests/x-ray/:id/',upload.single('x_ray_image'), requestController.x_ray);

module.exports = router;
