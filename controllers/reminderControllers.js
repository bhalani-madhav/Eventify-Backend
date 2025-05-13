const { Reminders } = require("../models/");

//function to create a new reminder
module.exports.createReminder = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const userId = req.user.id;
    if (!userId) {
      req.status(401).json({ error: "Please login to continue.." });
    } else {
        const currentDate = new Date(Date.now()+19800000);
    //   console.log(newDate);
      res.status(200).json({ currentDate: currentDate, date: date });
      //   const reminder = await Reminders.create({
      //     title,
      //     description,
      //     date,
      //   });
    }
  } catch (err) {
    console.log("ERROR IN CREATING NEW REMINDER:", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
