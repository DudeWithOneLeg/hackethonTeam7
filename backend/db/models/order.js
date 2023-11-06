
'use strict';
const { Model, DATEONLY } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId"
      })
      // Order.belongsToMany(models.Product, {
      //   through: models.OrderCart,
      //   foreignKey: "orderId"
      // })

      // Order.hasMany(models.OrderCart, {
      //   foreignKey: "orderId",
      //   onDelete: "CASCADE"
      // })
    }
  };

  Order.init({
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: new DATEONLY()
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "processing"
    },
    totalAmount: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Order'
  });
  return Order;
};
