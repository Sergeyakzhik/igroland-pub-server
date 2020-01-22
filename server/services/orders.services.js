const Orders = require('../models/orders.models');
const OrderGames = require('../models/order_games.models');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const getOrders = async () => {
    try {
        const data = await Orders.findAll({ 
            order: [ ['order', 'ASC'] ],
            include: [{
                model: OrderGames,
                attributes: ['game']
            }]
        });

        return data;
    } catch (err) {
        throw err;
    }    
};

const getOrderById = async id => {
    try {
        const data = await Orders.findOne({ 
            where: { id },
            include: [{
                model: OrderGames,
                attributes: ['game']
            }]
        });

        return data;
    } catch (err) {
        throw err;
    } 
};

const getOrdersNumber = async () => {
    try {
        const data = await Orders.count();

        return data;
    } catch (err) {
        throw err;
    }  
};

const createOrder = async query => {
    try {
        const { games = [] } = query;
        query.price = games.map(item => item.price).reduce((a, b) => a + b);
        let result = await Orders.create(query);
        const { id } = result.dataValues;

        result = await Promise.all([
            ...games.map(item => OrderGames.create({ order_id: id, game: item.title }))
        ]);    

        return result;
    } catch (err) {
        throw err;
    }  
};

const updateOrder = async (data, id) => {
    try {
        const { games = [] } = data;
        let result = await Orders.update(data, { where: { id } });
        const orderData = await getOrderById(id);
        const orderGames = orderData.order_games.map(item => item.game);

        await Promise.all([ ...orderGames.map(item => OrderGames.destroy({ where: { order_id: id, game: item } })) ]);

        result = await Promise.all([
            ...games.map(item => OrderGames.create({ order_id: id, game: item }))
        ]);    

        return result;
    } catch (err) {
        throw err;
    } 
};

const deleteOrder = async id => {
    return await Orders.destroy({ where: { id } });
};

const changeOrdersOrder = orderArr => {
    return Promise.all(orderArr.map((item, ind) => Orders.update({ order: ind }, { where: { id: item } })));
};

module.exports = {
    getOrders,
    getOrderById,
    getOrdersNumber,
    createOrder,
    updateOrder,
    deleteOrder,
    changeOrdersOrder
};