
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId"
      })
      Review.belongsTo(models.Product, {
        foreignKey: "productId"
      })
    }
  };

  Review.init({
    review: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Review'
  });
  return Review;
};
