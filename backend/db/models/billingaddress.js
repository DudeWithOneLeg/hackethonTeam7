'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BillingAddress extends Model {
    static associate(models) {
      BillingAddress.belongsTo(models.User), {
        foreignKey: "userId"
      }
    }
  }
  BillingAddress.init({
    billingAddress: {
      type: DataTypes.STRING,
    },
    billingState: {
      type: DataTypes.STRING,
    },
    billingZipCode: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'BillingAddress',
  });
  return BillingAddress;
};
