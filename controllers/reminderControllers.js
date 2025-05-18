const { Reminders } = require("../models/");

//function to create a new reminder
module.exports.createReminder = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const userId = req.user.id;
    if (!userId) {
      req.status(401).json({ error: "Please login to continue.." });
    } else {
      const currentDate = new Date(Date.now());
      const newDate = new Date(date);
      if (newDate < currentDate) {
        res.status(400).json({
          message: "Please enter a valid future date!!",
        });
      } else {
        const newReminder = await Reminders.create({
          title,
          description,
          date: newDate,
          createdBy: userId,
        });

        await newReminder.save();
        res.status(200).json({
          message: "Reminder created successfully!!",
          newReminder,
        });
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
    if (reminders && reminders.length != 0) {
      res.status(200).json({ reminders });
    } else {
      res.status(404).json({ error: "No reminders found!!" });
    }
  } catch (err) {
    console.log("ERROR IN FETCHING REMINDERS", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

//function to edit a particular reminder
module.exports.editReminder = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const userId = req.user.id;
    const reminderId = req.params.id;
    const reminder = await Reminders.findByPk(reminderId);
    if (!reminder) {
      res.status(404).json({ message: "No reminder with that id exists." });
    } else {
      if (userId !== reminder.createdBy) {
        res.status(401).json({ message: "Unauthorized!!" });
      } else {
        const currentDate = new Date(Date.now());
        const newDate = new Date(date);
        if (newDate < currentDate) {
          res.status(400).json({
            message: "Please enter a valid future date!!",
          });
        } else {
          await reminder.update({ title, description, date });
          console.log("REMAINDER", reminder);
          await reminder.save();
          res
            .status(200)
            .json({ message: "Reminder updated successfully!!", reminder });
        }
      }
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      err.errors.map((error) => {
        res.status(400).json({ error: error.message });
      });
    } else {
      console.log("ERROR IN EDITING REMINDER", err);
      res.status(500).json({ error: "Internal Server Error!!" });
    }
  }
};

//function to delete a particular reminder
module.exports.deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await Reminders.findByPk(reminderId);
    if (!reminder) {
      res.status(404).json({ error: "No reminder with that id exists." });
    } else {
      await Reminders.destroy({ where: { id: reminderId } });
      res.status(200).json({ message: "Reminder deleted successfully!!" });
    }
  } catch (err) {
    console.log("ERROR IN DELETING REMINDER", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

//function to get all reminders for a particular user with pagination
module.exports.pagination = async (req, res) => {
  try {
    const userId = req.user.id;
    let page = req.query.page;
    const limit = 5;
    const allReminders = await Reminders.findAll({
      where: { createdBy: userId },
    });
    const maxPage = Math.ceil(allReminders.length / limit);
    if (!page) {
      page = 1;
    }
    if (page > maxPage) {
      page = maxPage;
    }
    const offset = (page - 1) * limit;
    const reminders = await Reminders.findAll({
      limit: limit,
      offset: offset,
      where: { createdBy: userId },
    });

    if (reminders && reminders.length != 0) {
      res.status(200).json({ reminders, maxPage });
    } else {
      res.status(404).json({ error: "No reminders found!!" });
    }
  } catch (err) {
    console.log("ERROR IN FETCHING REMINDERS", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

//function to get a single reminder
module.exports.singleReminder = async (req, res) => {
  const userId = req.user.id;
  const reminderId = req.params.id;
  try {
    // Check if reminderId is a valid UUID (v4)
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!reminderId || !regex.test(reminderId)) {
      return res.status(400).json({ error: "Invalid reminder ID format." });
    } else {
      const reminder = await Reminders.findByPk(reminderId);

      if (reminder) {
        if (userId !== reminder.createdBy) {
          res.status(401).json({ message: "Unauthorized!!" });
        } else {
          res.status(200).json({ reminder });
        }
      } else {
        res.status(404).json({ error: "No reminders found!!" });
      }
    }
  } catch (err) {
    console.log("ERROR IN FETCHING REMINDER", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
