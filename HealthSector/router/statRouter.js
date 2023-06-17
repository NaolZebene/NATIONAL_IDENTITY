const router = require("express").Router();
const statController = require("../controller/Stat/disease_prediction")
const {isLoggedIn} = require("../utils/isLoggedIn")
const {authorize} = require("../utils/Authorization")

// router.get(,, statController.getStatView);
router.get("/stat/diseaseprediction", isLoggedIn,authorize(["centralAdmin"]),statController.getDiseasePrediction);

module.exports = router;