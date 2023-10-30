'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = 'Products'

module.exports = {
  async up(queryInterface, Sequelize) {
    const validProducts = [
      // 1
      {
        productName: 'Luxe Leather Sofa',
        productDescription: "Indulge in unparalleled comfort and style with our Luxe Leather Sofa. Crafted with precision, its buttery-soft leather upholstery complements its clean, sleek lines. Perfectly balanced between modern and timeless, this sofa is the epitome of sophistication.",
        productPrice: 4499.99,
        quantity: 29
      },
      // 2
      {
        productName: 'Zenith Dining Table',
        productDescription: 'Elevate your dining experience with the Zenith Dining Table. Impeccably crafted from premium materials, its minimalist design exudes a sense of Zen-like tranquility. The Zenith invites you to gather in luxury.',
        productPrice: 3799.99,
        quantity: 43
      },
      // 3
      {
        productName: 'Aura Coffee Table',
        productDescription: 'Discover pure elegance in simplicity with the Aura Coffee Table. Its minimalist design showcases a blend of form and function. The smooth surface and subtle lines create an ambiance of calm sophistication.',
        productPrice: 1499.99,
        quantity: 116
      },
      // 4
      {
        productName: 'Sleek Glass Desk',
        productDescription: 'Unleash your creativity at the Sleek Glass Desk. Designed for those who appreciate contemporary aesthetics, its transparent glass top and brushed metal accents seamlessly blend into your workspace, offering a place where ideas take flight.',
        productPrice: 1799.99,
        quantity: 87
      },
      // 5
      {
        productName: 'Minimalist Bookshelf',
        productDescription: 'The Minimalist Bookshelf marries form and function effortlessly. Its clean lines and open shelving provide a canvas for your most cherished literature and artistic collectibles. Less is more with this modern marvel.',
        productPrice: 999.99,
        quantity: 145
      },
      // 6
      {
        productName: 'Contemporary Nightstand',
        productDescription: 'Rest in the company of elegance with the Contemporary Nightstand. A harmonious blend of clean design and essential functionality, this nightstand complements your bedside with modern simplicity.',
        productPrice: 799.99,
        quantity: 188
      },
      // 7
      {
        productName: 'Scandi Rocking Chair',
        productDescription: 'Achieve balance and serenity in your living space with the Scandi Rocking Chair. Rooted in Scandinavian design principles, its ergonomic curves and soothing rocking motion offer the perfect blend of comfort and style.',
        productPrice: 1199.99,
        quantity: 87
      },
      // 8
      {
        productName: 'Nuovo Ottoman',
        productDescription: 'The Nuovo Ottoman brings modern chic to a new level. A statement of luxury and minimalist design, it adds a touch of refinement to your space. Rest your feet in style with this understated masterpiece.',
        productPrice: 599.99,
        quantity: 65
      },
      // 9
      {
        productName: 'French Rococo Dresser',
        productDescription: 'Evoke the opulence of a bygone era with the French Rococo Dresser. Handcrafted with intricate detailing, this piece stands as a testament to timeless beauty and exquisite craftsmanship.',
        productPrice: 5499.99,
        quantity: 24
      },
      // 10
      {
        productName: 'Art Deco Bar Stools',
        productDescription: 'Elevate your entertainment space with our Art Deco Bar Stools. Inspired by the glamour of the Jazz Age, these stools exude sophistication with their sleek lines, bold geometric patterns, and a hint of modernity.',
        productPrice: 399.99,
        quantity: 12
      },
    ]

    await queryInterface.bulkInsert(options, validProducts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
