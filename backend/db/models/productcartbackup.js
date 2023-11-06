'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCartBackup extends Model {
    static associate(models) {
      ProductCartBackup.belongsTo(models.User, {
        foreignKey: "userId",
      })
      ProductCartBackup.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
      })
      ProductCartBackup.belongsTo(models.Product, {
        foreignKey: "productId",
      })
    }
  };
  ProductCartBackup.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    pricePerUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProductCartBackup',
  });
  return ProductCartBackup;
};
