
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Product), {
        foreignKey: "productId"
      }
    }
  };

  ProductCategory.init({
    name: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'ProductCategory'
  });
  return ProductCategory;
};
