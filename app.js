const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const {initializePassport} = require('./auth/passportConfig');
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//passsport
initializePassport(passport);

//routes
app.use("/", userRoutes);

//authenticate connection
const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connect();
//sync database
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
};
// syncDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
