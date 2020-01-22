const Sequelize = require('sequelize');

const Orders = require('./orders.models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const OrderGames = sequelize.define('order_games', {
    order_id: {
        type: Sequelize.INTEGER(11),
        references: {
            model: Orders,
            key: 'id'
        }
    },
    game: Sequelize.STRING(255)
});

module.exports = OrderGames;
