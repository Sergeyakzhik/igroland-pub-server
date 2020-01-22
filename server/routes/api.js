const express = require('express');

const Locations = require('../models/locations.models');
const Games = require('../models/games.models');
const Users = require('../models/users.models');
const Orders = require('../models/orders.models');
const OrderGames = require('../models/order_games.models');

const usersRouter = require('./users.routes');
const locationsRouter = require('./locations.routes');
const gameRouter = require('./games.routes');
const ordersRouter = require('./orders.routes');
const brochuresRouter = require('./brochures.routes');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/games', gameRouter);
router.use('/orders', ordersRouter);
router.use('/brochures', brochuresRouter);

try {
    Locations.sync().then(() => {
        Users.sync().then(() => {
            Games.sync().then(() => {
                Orders.sync().then(() => {
                    OrderGames.sync().then(() => {
                        console.log('DATABASE SYNCED');
                    });
                });
            });
        });
    });
} catch(err) {
    console.log('SYNC ERROR\n' + err.stack);
}

module.exports = router;

