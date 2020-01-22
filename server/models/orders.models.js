const Sequelize = require('sequelize');

const OrderGames = require('./order_games.models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const Orders = sequelize.define('orders', {
    email: Sequelize.STRING(255),
    price: Sequelize.INTEGER(11),
    completed: Sequelize.BOOLEAN,
    order: Sequelize.INTEGER(11)
});

Orders.hasMany(OrderGames, { foreignKey: 'order_id', sourceKey: 'id', onDelete: 'CASCADE' });

module.exports = Orders;