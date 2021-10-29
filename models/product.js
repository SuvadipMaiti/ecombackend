'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        richDescription: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        images: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        brand: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        price: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        countInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            min: 0,
            max: 255
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        numReviews: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'Product',
        freezeTableName: true,
        tableName: 'products'
    });
    return Product;
};