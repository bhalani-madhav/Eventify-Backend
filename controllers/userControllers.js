const { Users } = require("../models/");
const bcrypt = require("bcrypt");
const key = "santaClause90*32@@";
const jwt = require("jsonwebtoken");
const { ValidationErrorItem } = require("sequelize");

//function to handle user registration
module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  console.log("HG BODY CONTENT: ", req.body);
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      res
        .status(409)
        .json({ error: "User already exists. Please sign in to continue.." });
    } else {
      const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])[A-Za-z0-9#?!@$%^&*-]+$/;
      if (password === confirmPassword) {
        if (password.length >= 8 && confirmPassword.length >= 8) {
          if (regex.test(password)) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await Users.create({
              firstName,
              lastName,
              email,
              password: hashedPassword,
            });
            await newUser.save();
            res
              .status(201)
              .json({ message: "User registered successfully!!", newUser });
          } else {
            res.status(400).json({
              error:
                "The password must contain one uppercase letter, one lowercase letter, one digit and one special character.",
            });
          }
        } else {
          res
            .status(400)
            .json({ error: "Password must be at least 8 characters!!" });
        }
      } else {
        res
          .status(400)
          .json({ error: "Please enter the same password as above." });
      }
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      err.errors.map((error) => {   
        res.status(400).json({ error: error.message });
      });
    } else {
      console.log("ERROR IN  REGISTERING USER:", err);
      res.status(500).json({ error: "Internal Server Error!!" });
    }
  }
};

//function to handel user login
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).json({ error: "No user found. Please register!!" });
    } else {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const token = jwt.sign({ sub: user.id }, key, { expiresIn: "1d" });
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
        res.status(200).json({ message: "Logged in successfully!!" });
      } else {
        res.status(401).json({ message: "Please enter a correct password!!" });
      }
    }
  } catch (err) {
    console.log("ERROR IN LOGGING IN", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};

//function to handle user logout
module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
    res.status(200).json({ message: "Logged out successfully!!" });
  } catch (err) {
    console.log("ERROR IN LOGGING OUT USER:", err);
    res.status(500).json({ error: "Internal Server Error!!" });
  }
};
