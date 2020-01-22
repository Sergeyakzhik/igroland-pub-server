const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const Locations = sequelize.define('locations', {
    name: Sequelize.STRING(255),
    address: Sequelize.STRING(255),
    city: Sequelize.STRING(255),
    country: Sequelize.STRING(45),
    coordinates: Sequelize.STRING(255),
    order: Sequelize.INTEGER(11),
    published: Sequelize.BOOLEAN
});

module.exports = Locations;