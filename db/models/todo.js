"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = (sequelize) => {
  const todo = sequelize.define(
    "todos",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title can't be null",
          },
          notEmpty: {
            msg: "title can't be null",
          },
        },
      },
      column: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "column can't be null",
          },
          notEmpty: {
            msg: "column can't be null",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      modelName: "todos",
    }
  );
};
