"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Discounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      applicableCategory: {
        type: Sequelize.STRING,
        defaultValue: "All",
        allowNull: false
      },
      discountType: {
        type: Sequelize.STRING,
        defaultValue: "percent",
        allowNull: false
      },
      discountValue: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Discounts";
    return queryInterface.dropTable(options);
  }
};
