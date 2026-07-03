const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

//signup - GET
router.get("/signup", userController.renderSignup);

//signup - POST
router.post("/signup", userController.signup);

//login - GET
router.get("/login", userController.renderLogin);

//login - POST
router.post("/login", saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    userController.login);

//logout
router.get("/logout", userController.logout);

module.exports = router;