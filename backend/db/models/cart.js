'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId"
            })
            Cart.belongsTo(models.Product, {
                foreignKey: "productId"
            })
        }
    };

    Cart.init({
        subtotal: {
            type: DataTypes.DECIMAL
        }
    }, {
        sequelize,
        modelName: 'Cart'
    });
    return Cart;
};
