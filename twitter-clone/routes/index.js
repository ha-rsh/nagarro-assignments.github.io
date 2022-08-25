const express = require("express");

const { getLoginPage } = require("../controllers");
const { getMainPage } = require("../controllers/main");

const router = express.Router();

router.get("/", getLoginPage);
router.get('/:page', getMainPage);
module.exports = router;
