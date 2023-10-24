
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        static associate(models) { }
    };

    Discount.init({
        codeName: {
            type: DataTypes.STRING,
        },
        applicableCategory: {
            type: DataTypes.STRING,
            defaultValue: "All"
        },
        discountValue: {
            type: DataTypes.INTEGER
        },
        expirationDate: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Discount'
    });
    return Discount;
};
