"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("datafeed", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userType: {
        type: Sequelize.ENUM("0 ", " 1 ", "2 "),
      },
      saveDate: {
        type: Sequelize.DATE,
      },
      karykarName: {
        type: Sequelize.STRING,
      },
      yuvakName: {
        type: Sequelize.STRING,
      },
      place: {
        type: Sequelize.STRING,
      },
      timeSpent: {
        type: Sequelize.TIME,
      },
      comments: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("datafeed");
  },
};
