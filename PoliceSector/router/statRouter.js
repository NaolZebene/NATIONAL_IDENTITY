const router = require("express").Router()

const statController = require("../controller/stat/crimerate")

const {isLoggedIn} = require("../utils/isLoggedIn")

router.get("/stat/getcrimerate",isLoggedIn,  statController.crimeRate)

router.get("/stat/crimetype",isLoggedIn, statController.crimeType);

module.exports = router;