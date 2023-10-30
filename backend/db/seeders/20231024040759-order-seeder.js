'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Orders'

module.exports = {
  async up (queryInterface, Sequelize) {
    const validOrders = [
      {
        userId: 2,
        orderDate: new Date("2023-01-14T21:05:50Z"),
        status: "Complete",
        totalAmount: 2199.97
      },
      {
        userId: 2,
        orderDate: new Date("2023-02-02T15:36:05Z"),
        status: "Complete",
        totalAmount: 2799.98
      },
      {
        userId: 2,
        orderDate: new Date("2023-03-24T10:27:15Z"),
        status: "Complete",
        totalAmount: 599.99,
      },
      {
        userId: 3,
        orderDate: new Date("2023-05-12T13:45:25Z"),
        status: "Complete",
        totalAmount: 4499.99,
      },
      {
        userId: 3,
        orderDate: new Date("2023-07-10T11:59:55Z"),
        status: "Complete",
        totalAmount: 3299.98,
      },
      {
        userId: 4,
        orderDate: new Date("2023-10-15T14:32:45Z"),
        status: "Pending",
        totalAmount: 5499.99,
      },
    ]

    await queryInterface.bulkInsert(options, validOrders, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
