'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
      })
      ProductCart.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      })
    }
  };
  ProductCart.init({
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};