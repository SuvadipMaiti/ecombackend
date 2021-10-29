'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
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
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            richDescription: {
                type: Sequelize.TEXT,
                defaultValue: ''
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            images: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            brand: {
                type: Sequelize.STRING,
                defaultValue: ''
            },
            price: {
                type: Sequelize.DECIMAL,
                defaultValue: 0
            },
            category: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            countInStock: {
                type: Sequelize.INTEGER,
                allowNull: false,
                min: 0,
                max: 255
            },
            rating: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            numReviews: {
                type: Sequelize.STRING,
                defaultValue: 0
            },
            isFeatured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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

        await queryInterface.addConstraint('products', {
            fields: ['category'],
            type: 'foreign key',
            references: {
                table: 'categories',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};