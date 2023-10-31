'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
      ProductCategory.belongsTo(models.Product, {
        foreignKey: "productId"
      })
    }
  };

  ProductCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'ProductCategory'
  });
  return ProductCategory;
};
