const { Users } = require("../models/");

module.exports.authCheck = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).json({user});
    } else {
      res.status(401).json({ message: "Unauthorized user!!" });
    }
  } catch (err) {
    console.log("ERROR IN LOGGING IN", err);
    res.status(500).json({ messsage: "Internal Server Error!!" });
  }
};
