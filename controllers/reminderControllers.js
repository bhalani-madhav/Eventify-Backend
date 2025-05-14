const { Reminders } = require("../models/");

//function to create a new reminder
module.exports.createReminder = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const userId = req.user.id;
    if (!userId) {
      req.status(401).json({ error: "Please login to continue.." });
    } else {
      const currentDate = new Date(Date.now() + 19800000);
      const formattedDate = currentDate.toISOString().split("T")[0];
      //   console.log(newDate);
      if (date < formattedDate) {
        res.status(400).json({
          error:
            "Please enter a future date i.e. greater than " + formattedDate,
        });
      } else {
        const newReminder = await Reminders.create({
          title,
          description,
          date,
          createdBy: userId,
          createdAt: currentDate,
          updatedAt: currentDate
        });

        await newReminder.save();
        res
          .status(200)
          .json({ message: "Reminder created successfully!!", newReminder });
      }
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      err.errors.map((error) => {
        res.status(400).json({ error: error.message });
      });
    } else {
      console.log("ERROR IN CREATING REMINDER", err);
      res.status(500).json({ error: "Internal Server Error!!" });
    }
  }
};

//function to get all reminders for a particular user
module.exports.viewReminders = async (req, res) => {
  try {
    const userId = req.user.id;
    const reminders = await Reminders.findAll({ where: { createdBy: userId } });
    if (reminders) {
      res
        .status(200)
        .json({ message: "Reminders fetched successfully!!", reminders });
    } else {
      res.status(404).json({ error: "No reminders found!!" });
    }
  } catch (err) {
    console.log("ERROR IN FETCHING REMINDERS", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
