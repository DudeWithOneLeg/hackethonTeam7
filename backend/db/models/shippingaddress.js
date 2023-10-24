
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    static associate(models) {
      ShippingAddress.belongsTo(models.User), {
        foreignKey: "userId"
      }
    }
  };

  ShippingAddress.init({
    shippingAddress: {
      type: DataTypes.STRING,
    },
    shippingState: {
      type: DataTypes.STRING,
    },
    shippingZipCode: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ShippingAddress'
  });
  return ShippingAddress;
};
