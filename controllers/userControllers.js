require("dotenv").config();
const { Users } = require("../models/");
const bcrypt = require("bcrypt");
const key = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { ValidationErrorItem } = require("sequelize");

//function to handle user registration
module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      res.status(409).json({
        message: "Email already in use. Please use different email to sign up",
      });
    } else {
      let currentDate = new Date(Date.now() + 19800000);
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
              updatedAt: currentDate,
              createdAt: currentDate,
            });
            await newUser.save();
            res
              .status(201)
              .json({ message: "User registered successfully!!", newUser });
          } else {
            res.status(400).json({
              message:
                "The password must contain one uppercase letter, one lowercase letter, one digit and one special character.",
            });
          }
        } else {
          res
            .status(400)
            .json({ message: "Password must be at least 8 characters!!" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Please enter the same password as above." });
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
      res.status(404).json({ message: "No user found. Please register!!" });
    } else {
      const firstName = user.firstName;
      const lastName = user.lastName;
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const token = jwt.sign({ sub: user.id }, key, { expiresIn: "1d" });
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
        res
          .status(200)
          .json({ message: "Logged in successfully!!", firstName, lastName });
      } else {
        res.status(401).json({ message: "Please enter a correct password!!" });
      }
    }
  } catch (err) {
    console.log("ERROR IN LOGGING IN", err);
    res.status(500).json({ messsage: "Internal Server Error!!" });
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
