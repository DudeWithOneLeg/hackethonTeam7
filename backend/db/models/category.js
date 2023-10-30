'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.ProductCategory, {
        foreignKey: "categoryId"
      })

      Category.belongsToMany(models.Product, {
        through: models.ProductCategory,
        foreignKey: "categoryId",
      })
    }
  }
  Category.init({
    categoryName: {
      type: DataTypes.STRING,
      defaultValue: "All"
    },
    section: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
