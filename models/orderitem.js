'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    OrderItem.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'OrderItem',
        freezeTableName: true,
        tableName: 'orderitems'
    });
    return OrderItem;
};