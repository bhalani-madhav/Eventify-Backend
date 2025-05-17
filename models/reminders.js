"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reminders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, { foreignKey: "createdBy" });
    }
  }
  Reminders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        unique: true,
        autoIncrement: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title is required!!",
          },
          len: {
            args: [1, 100],
            msg: "The title cannot exceed 100 characters!!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT(),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required!!",
          },
          len: {
            args: [1, 500],
            msg: "The description cannot exceed 500 characters!!",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Date and time is required!!",
          },
          isDate: {
            args: true,
            msg: "Please enter valid date and time",
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: "Reminders",
      tableName: "reminders",
      underscored: true,
    }
  );
  return Reminders;
};
