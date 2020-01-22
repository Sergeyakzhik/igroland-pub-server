const express = require('express');

const GamesController = require('../controllers/games.controllers');
const verifyToken = require('./middleware').verifyToken;

const gamesRouter = express.Router();

gamesRouter.get('/', verifyToken, GamesController.getGames);

gamesRouter.get('/published', GamesController.getPublishedGames);

gamesRouter.get('/image/:id', GamesController.getGameImage);

gamesRouter.get('/game/:id', verifyToken, GamesController.getGameById);

gamesRouter.get('/count', GamesController.getGamesNumber);

gamesRouter.post('/create-game', verifyToken, GamesController.createGame);

gamesRouter.put('/game/:id', verifyToken, GamesController.updateGame);

gamesRouter.put('/order', verifyToken, GamesController.changeGamesOrder);

gamesRouter.delete('/:id', verifyToken, GamesController.deleteGame);

module.exports = gamesRouter;