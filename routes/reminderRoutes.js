const express = require("express");
const router = express.Router();
const reminder = require("../controllers/reminderControllers");
const passport = require("passport");

//create reminder api
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  reminder.createReminder
);

//list reminders by server side pagination
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  reminder.pagination
);

//edit reminder
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.editReminder
);
//delete reminder
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.deleteReminder
);
//single reminder details
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.singleReminder
);

module.exports = router;
