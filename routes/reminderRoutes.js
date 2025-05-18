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
  reminder.pagination
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.editReminder
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.deleteReminder
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  reminder.singleReminder
);

// router.get(
//   "/pagination",
//   passport.authenticate("jwt", { session: false }),
//   reminder.pagination
// );
module.exports = router;
