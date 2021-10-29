'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderItems: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            shippingAddress1: {
                type: Sequelize.STRING,
                allowNull: false
            },
            shippingAddress2: {
                type: Sequelize.STRING,
                allowNull: false
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            zip: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Pending'
            },
            totalPrice: {
                type: Sequelize.DECIMAL
            },
            user: {
                type: Sequelize.INTEGER
            },
            dateOrderd: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.DATE.NOW
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

        await queryInterface.addConstraint('orders', {
            fields: ['orderItems'],
            type: 'foreign key',
            references: {
                table: 'orderitems',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        await queryInterface.addConstraint('orders', {
            fields: ['user'],
            type: 'foreign key',
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orders');
    }
};