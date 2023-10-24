'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Discounts'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validDiscounts = [
      {
        codeName: "WELCOME15",
        applicableCategory: "all",
        discountValue: 15,
        expirationDate: new Date("9999-12-31T08:00:00Z")
      },
      {
        codeName: "CHAIR10",
        applicableCategory: "chair",
        discountValue: 10,
        expirationDate: new Date("2023-12-31T12:00:00Z")
      },
      {
        codeName: "SUMMER30",
        applicableCategory: "furniture",
        discountValue: 30,
        expirationDate: new Date("2024-8-31T12:00:00Z")
      }
    ]

    await queryInterface.bulkInsert(options, validDiscounts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
