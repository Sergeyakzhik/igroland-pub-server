const Games = require('../models/games.models');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const getGames = async () => {
    try {
        const data = await Games.findAll({ 
            attributes: ['id', 'title', 'category', 'left', 'published'],
            order: [ ['order', 'ASC'] ] 
        });

        return data;
    } catch (err) {
        throw err;
    }    
};

const getPublishedGames = async () => {
    try {
        const data = await Games.findAll({
            attributes: ['id', 'title', 'category', 'left', 'published', 'price'],
            where: { published: 1 },
            order: [ ['order', 'ASC'] ]
        });

        return data;
    } catch (err) {
        throw err;
    } 
};

const getGameImage = id => {
    return Games.findOne({ where: { id }, attributes: ['id', 'image'] });
};

const getGameById = async id => {
    try {
        const data = await Games.findOne({ where: { id } });

        return data;
    } catch (err) {
        throw err;
    } 
};

const getGamesNumber = async () => {
    try {
        const data = await Games.count();

        return data;
    } catch (err) {
        throw err;
    }  
};

const createGame = async query => {
    try {
        const result = await Games.create(query);

        return result;
    } catch (err) {
        throw err;
    }  
};

const updateGame = async (data, id) => {
    try {
        const result = await Games.update(data, { where: { id } });

        return result;
    } catch (err) {
        throw err;
    } 
};

const deleteGame = async id => {
    return await Games.destroy({ where: { id } });
};

const changeGamesOrder = orderArr => {
    return Promise.all(orderArr.map((item, ind) => Games.update({ order: ind }, { where: { id: item } })));
};

module.exports = {
    getGames,
    getPublishedGames,
    getGameImage,
    getGameById,
    getGamesNumber,
    createGame,
    updateGame,
    deleteGame,
    changeGamesOrder
};