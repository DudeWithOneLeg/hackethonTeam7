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
        orderDate: new Date("2023-01-14"),
        status: "complete",
        totalAmount: 219997
      },
      {
        userId: 2,
        orderDate: new Date("2023-02-02"),
        status: "complete",
        totalAmount: 279998
      },
      {
        userId: 2,
        orderDate: new Date("2023-03-24"),
        status: "complete",
        totalAmount: 59999,
      },
      {
        userId: 3,
        orderDate: new Date("2023-05-12"),
        status: "complete",
        totalAmount: 449999,
      },
      {
        userId: 3,
        orderDate: new Date("2023-07-10"),
        status: "complete",
        totalAmount: 329998,
      },
      {
        userId: 4,
        orderDate: new Date("2023-10-15"),
        status: "processing",
        totalAmount: 549999,
      },
    ]

    await queryInterface.bulkInsert(options, validOrders, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
