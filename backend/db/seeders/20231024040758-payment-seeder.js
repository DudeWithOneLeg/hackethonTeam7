'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Payments'

module.exports = {
  async up(queryInterface, Sequelize) {
    // const validPayments = []
    // await queryInterface.bulkInsert(options, validPayments, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
