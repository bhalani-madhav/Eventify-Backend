const { sequelize } = require("./models");

//sync database to create tables
const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to sync the database:", error);
    process.exit(1);
  }
};
syncDB();
