'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        street: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        apartment: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        zip: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        city: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
    }, {
        sequelize,
        modelName: 'User',
        freezeTableName: true,
        tableName: 'users'
    });
    return User;
};