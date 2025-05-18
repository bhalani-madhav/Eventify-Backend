const express = require("express");
const router = express.Router();
const user = require("../controllers/userControllers");
const passport = require("passport");
const { authCheck } = require("../auth/authCheck");



//sign up api
router.post("/register", user.registerUser);

//login api
router.post("/login", user.loginUser);
//logout api
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  user.logoutUser
);


router.get(
  "/authCheck",
  passport.authenticate("jwt", { session: false }),
  authCheck
);

module.exports = router;
