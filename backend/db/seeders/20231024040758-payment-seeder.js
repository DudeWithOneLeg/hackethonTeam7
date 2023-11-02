'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Payments'

module.exports = {
  async up(queryInterface, Sequelize) {
    // this is just a sample payment seeder, don't know how the table is actually going to look in the end
      // will require future edits
    const validPayments = [
      {
        userId: "1",
        method: "Visa",
        creditCardInformation: "1234567891234567"
      },
      {
        userId: "1",
        method: "Visa",
        creditCardInformation: "1111111111111111"
      },
      {
        userId: "2",
        method: "Visa",
        creditCardInformation: "9876543219876543"
      }
    ]

    await queryInterface.bulkInsert(options, validPayments, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
