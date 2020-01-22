const express = require('express');

const UserController = require('../controllers/users.controllers');
const verifyToken = require('./middleware').verifyToken;

const usersRouter = express.Router();

usersRouter.get('/info', verifyToken, UserController.getUserInfo);

usersRouter.post('/login', UserController.login);

usersRouter.post('/signup', UserController.signup);

module.exports = usersRouter;