'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: "userId"
            })
            Cart.hasMany(models.ProductCart, {
                foreignKey: "cartId",
                onDelete: "CASCADE"
            })
            Cart.belongsToMany(models.Product, {
                through: models.ProductCart,
                foreignKey: "cartId"
            })
            Cart.hasOne(models.StripeSession, {
                foreignKey: "cartId",
                onDelete: "CASCADE"
            })
        }

        async getCartItems() {
            return this.getProductCarts();
        }
    };

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        sequelize,
        modelName: 'Cart'
    });
    return Cart;
};
