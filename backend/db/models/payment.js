
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User), {
        foreignKey: "userId"
      }
    }
  };

  Payment.init({
    method: {
      type: DataTypes.STRING,
    },
    creditCardInformation: {
      type: DataTypes.STRING, // this is not ideal, will require more work
    }
  }, {
    sequelize,
    modelName: 'Payment'
  });
  return Payment;
};
