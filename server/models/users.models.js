const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const Users = sequelize.define('users', {
    username: Sequelize.STRING(45),
    password: Sequelize.STRING(255) 
}, {
    timestamps: false
});

module.exports = Users;