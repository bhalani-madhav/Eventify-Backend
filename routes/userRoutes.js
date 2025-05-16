const express = require("express");
const router = express.Router();
const user = require("../controllers/userControllers");
const passport = require("passport");
const { authCheck } = require("../auth/authCheck");

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;
    res.send(
      "welcome authenticated user: " + user.firstName + " " + user.lastName
    );
  }
);
router.post("/register", user.registerUser);
router.post("/login", user.loginUser);
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
