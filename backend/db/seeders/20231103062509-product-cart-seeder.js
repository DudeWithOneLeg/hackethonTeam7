'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'ProductCarts'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validProductCarts = [
      // for User 2
      {
        cartId: 2,
        productId: 1,
        quantity: 2
      },
      {
        cartId: 2,
        productId: 2,
        quantity: 1
      },
      // for User 3
      {
        cartId: 3,
        productId: 1,
        quantity: 1
      },
      {
        cartId: 3,
        productId: 3,
        quantity: 1
      },
      {
        cartId: 3,
        productId: 4,
        quantity: 1
      },
      {
        cartId: 3,
        productId: 9,
        quantity: 1
      },
      // For User 4
      {
        cartId: 4,
        productId: 7,
        quantity: 1
      },
      // For User 5
      {
        cartId: 5,
        productId: 3,
        quantity: 4
      },
      {
        cartId: 5,
        productId: 4,
        quantity: 2
      },
      {
        cartId: 5,
        productId: 8,
        quantity: 4
      },
    ]

    await queryInterface.bulkInsert(options, validProductCarts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
