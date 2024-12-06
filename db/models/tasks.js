"use strict";
const { Model } = require("sequelize");
const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "tasks",
  {
    tasks_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskStartDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "tasks",
  }
);

