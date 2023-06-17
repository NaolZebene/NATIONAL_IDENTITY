const router = require("express").Router();
const statController = require("../controller/Stat/app")

const {isLoggedIn} = require("../util/isLoggedIn")

router.get("/stat/prediction",isLoggedIn, statController.Prediction)

router.get("/stat/growthpred",isLoggedIn, statController.growthPrediction)

module.exports = router;