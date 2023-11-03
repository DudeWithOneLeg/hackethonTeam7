
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
      type: DataTypes.STRING,
      defaultValue: "processing"
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    sequelize,
    modelName: 'Order'
  });
  return Order;
};
