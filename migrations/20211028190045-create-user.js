'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            street: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            apartment: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            zip: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            city: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            country: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};