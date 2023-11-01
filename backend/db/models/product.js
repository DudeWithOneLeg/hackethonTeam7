'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Review, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            })
            Product.hasMany(models.Cart, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            })
            Product.hasMany(models.ProductImage, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            })
            Product.hasMany(models.ProductCategory, {
                foreignKey: "productId",
                onDelete: "CASCADE"
            })

            Product.belongsToMany(models.Category, {
                through: models.ProductCategory,
                foreignKey: "productId",
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
