"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "datafeed",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM("0 ", " 1 ", "2 "),
    },
    saveDate: {
      type: DataTypes.DATE,
    },
    karykarName: {
      type: DataTypes.STRING,
    },
    yuvakName: {
      type: DataTypes.STRING,
    },
    place: {
      type: DataTypes.STRING,
    },
    timeSpent: {
      type: DataTypes.TIME,
    },
    comments: {
      type: DataTypes.STRING,
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
    modelName: "dataFeed",
  }
);
