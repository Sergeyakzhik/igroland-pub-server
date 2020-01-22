const express = require('express');

const OrdersController = require('../controllers/orders.controllers');
const verifyToken = require('./middleware').verifyToken;

const ordersRouter = express.Router();

ordersRouter.get('/', verifyToken, OrdersController.getOrders);

ordersRouter.get('/order/:id', verifyToken, OrdersController.getOrderById);

ordersRouter.get('/count', OrdersController.getOrdersNumber);

ordersRouter.post('/create-order', OrdersController.createOrder);

ordersRouter.put('/order/:id', verifyToken, OrdersController.updateOrder);

ordersRouter.put('/order', verifyToken, OrdersController.changeOrdersOrder);

ordersRouter.delete('/:id', verifyToken, OrdersController.deleteOrder);

module.exports = ordersRouter;