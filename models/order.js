'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        orderItems: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shippingAddress1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shippingAddress2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending'
        },
        totalPrice: {
            type: DataTypes.DECIMAL
        },
        user: {
            type: DataTypes.INTEGER
        },
        dateOrderd: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.DATE.NOW
        },
    }, {
        sequelize,
        modelName: 'Order',
        freezeTableName: true,
        tableName: 'orders'
    });
    return Order;
};