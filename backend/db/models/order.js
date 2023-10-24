
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  };

  Order.init({
    orderDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING
    },
    totalAmount: {
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Order'
  });
  return Order;
};
