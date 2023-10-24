'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'BillingAddresses'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validBillingAddresses = [
      {
        userId: 2,
        billingAddress: "123 Main Street",
        billingState: "California",
        billingZipCode: "90210"
      },
      {
        userId: 3,
        billingAddress: "456 Elm Avenue",
        billingState: "New York",
        billingZipCode: "10001"
      },
      {
        userId: 4,
        billingAddress: "789 Oak Lane",
        billingState: "Texas",
        billingZipCode: "77002"
      },
    ]

    await queryInterface.bulkInsert(options, validBillingAddresses, {})


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
