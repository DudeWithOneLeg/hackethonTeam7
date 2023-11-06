
'use strict';
const { Model, DATEONLY } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  };

  Order.init({
    // orderProducts: {
    //   type: DataTypes.
    // },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: new DATEONLY()
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
