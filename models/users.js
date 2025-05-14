"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      // define association here
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        unique: true,
        autoIncrement: false,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isAlpha: { msg: "First Name cannot contain digits or special characters" },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isAlpha: { msg: "Last Name cannot contain digits or special characters" },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Please enter a valid email address!!" },
        },
      },
      password: {
        type: DataTypes.STRING(72),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        validate: {
          isDate: { msg: "Invalid date format" },
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        validate: {
          isDate: { msg: "Invalid date format" },
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      underscored: true,
    }
  );
  return Users;
};
