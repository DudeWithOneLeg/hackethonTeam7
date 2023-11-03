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
        userId: 2,
        cartId: 2,
        productId: 1,
        quantity: 2,
        pricePerUnit: 4499.99
      },
      {
        userId: 2,
        cartId: 2,
        productId: 2,
        quantity: 1,
        pricePerUnit: 3799.99
      },
      // for User 3
      {
        userId: 3,
        cartId: 3,
        productId: 1,
        quantity: 1,
        pricePerUnit: 4499.99
      },
      {
        userId: 3,
        cartId: 3,
        productId: 3,
        quantity: 1,
        pricePerUnit: 1499.99
      },
      {
        userId: 3,
        cartId: 3,
        productId: 4,
        quantity: 1,
        pricePerUnit: 1799.99
      },
      {
        userId: 3,
        cartId: 3,
        productId: 9,
        quantity: 1,
        pricePerUnit: 5499.99,
      },
      // For User 4
      {
        userId: 4,
        cartId: 4,
        productId: 7,
        quantity: 1,
        pricePerUnit: 1199.99
      },
      // For User 5
      {
        userId: 4,
        cartId: 5,
        productId: 3,
        quantity: 4,
        pricePerUnit: 1499.99
      },
      {
        userId: 5,
        cartId: 5,
        productId: 4,
        quantity: 2,
        pricePerUnit: 1799.99
      },
      {
        userId: 5,
        cartId: 5,
        productId: 8,
        quantity: 4,
        pricePerUnit: 599.99
      },
    ]

    await queryInterface.bulkInsert(options, validProductCarts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
