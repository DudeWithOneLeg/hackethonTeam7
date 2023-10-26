'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Review, {
                foreignKey: "productId"
            })
            Product.hasMany(models.Cart, {
                foreignKey: "productId"
            })
            Product.hasMany(models.ProductImage, {
                foreignKey: "productId"
            })
            Product.hasMany(models.ProductCategory, {
                foreignKey: "productId"
            })

            Product.belongsToMany(models.Category, {
                through: models.ProductCategory,
                foreignKey: "productId",
                // as: "categoryName"
            })
        }
    };

    Product.init({
        productName: {
            type: DataTypes.STRING,
        },
        productDescription: {
            type: DataTypes.STRING,
        },
        productPrice: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Product'
    });
    return Product;
};
