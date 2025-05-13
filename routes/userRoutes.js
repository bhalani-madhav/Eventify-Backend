const express = require("express");
const router = express.Router();
const user = require("../controllers/userControllers");

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);
router.post("/logout", user.logoutUser)

module.exports = router;
