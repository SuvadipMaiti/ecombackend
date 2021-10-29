'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//https://www.youtube.com/watch?v=bQA8GO_pJPo&list=PLolI8AY2AS9YO1kf0i_ui5_sKtxZg-yiR&index=23
//https://www.woolha.com/tutorials/sequelize-aggregate-functions-sum-count-min-max-etc-examples
//https://www.bezkoder.com/sequelize-associate-one-to-many/
//https://www.bezkoder.com/sequelize-associate-many-to-many/
//https://stackoverflow.com/questions/21883484/how-to-use-an-include-with-attributes-with-sequelize

db.Product = require("./product.js")(sequelize, Sequelize);
db.Category = require("./category.js")(sequelize, Sequelize);

db.Category.hasMany(db.Product, { foreignKey: 'category', targetKey: 'id', as: "hasManyProducts" });
db.Product.belongsTo(db.Category, { foreignKey: 'category', targetKey: 'id', as: "belongsToCategory" });



module.exports = db;