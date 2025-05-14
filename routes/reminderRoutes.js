const express = require("express");
const router = express.Router();
const reminder = require("../controllers/reminderControllers");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  reminder.createReminder
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  reminder.viewReminders
);

module.exports = router;
