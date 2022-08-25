const express = require("express");
const router = express.Router();
const {authenticateGoogle, authenticateGoogleCallback, logOut, signUp, login } = require("../controllers/auth");

router.get("/google", authenticateGoogle);
router.get("/google/callback", authenticateGoogleCallback);
router.get("/logout", logOut);
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;
