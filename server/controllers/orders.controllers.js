const OrdersService = require('../services/orders.services');
const errorEnvelope = require('../utils').errorEnvelope;

const getOrders = async (req, res) => {
    try {
        const result = await OrdersService.getOrders();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getOrderById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await OrdersService.getOrderById(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getOrdersNumber = async (req, res) => {
    try {
        const result = await OrdersService.getOrdersNumber();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const createOrder = async (req, res) => {
    const data = req.body;

    try {
        const result = await OrdersService.createOrder(data);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const result = await OrdersService.updateOrder(data, id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await OrdersService.deleteOrder(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const changeOrdersOrder = async (req, res) => {
    try {
        const result = await OrdersService.changeOrdersOrder(req.body);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
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