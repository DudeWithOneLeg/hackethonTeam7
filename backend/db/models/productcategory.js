'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      ProductCategory.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
    }
  };

  ProductCategory.init({}, {
    sequelize,
    modelName: 'ProductCategory'
  });
  return ProductCategory;
};
