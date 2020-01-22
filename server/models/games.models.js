const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const Games = sequelize.define('games', {
    title: Sequelize.STRING(255),
    category: Sequelize.STRING(255),
    description: Sequelize.TEXT,
    players: Sequelize.STRING(10),
    time: Sequelize.STRING(10),
    left: Sequelize.INTEGER(11),
    image: Sequelize.TEXT,
    manufacturer: Sequelize.STRING(255),
    price: Sequelize.INTEGER(11),
    published: Sequelize.BOOLEAN,
    order: Sequelize.INTEGER(11),
    new: Sequelize.BOOLEAN
});

module.exports = Games;