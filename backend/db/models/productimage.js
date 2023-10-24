
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product), {
        foreignKey: "productId"
      }
    }
  };

  ProductImage.init({
    image: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ProductImage'
  });
  return ProductImage;
};
