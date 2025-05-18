const dotenv = require("dotenv").config().parsed;

module.exports = {
  development: {
    username: dotenv.USERNAME,
    password: dotenv.PASSWORD,
    database: dotenv.DB_NAME,
    host: dotenv.HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
