const express = require('express');

const BrochuresController = require('../controllers/brochures.controllers');

const brochuresRouter = express.Router();

brochuresRouter.post('/', BrochuresController.sendOrder);

module.exports = brochuresRouter;