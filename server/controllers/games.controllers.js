const GamesService = require('../services/games.services');
const errorEnvelope = require('../utils').errorEnvelope;

const getGames = async (req, res) => {
    try {
        const result = await GamesService.getGames();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getPublishedGames = async (req, res) => {
    try {
        const result = await GamesService.getPublishedGames();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getGameImage = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await GamesService.getGameImage(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getGameById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await GamesService.getGameById(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getGamesNumber = async (req, res) => {
    try {
        const result = await GamesService.getGamesNumber();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const createGame = async (req, res) => {
    const data = req.body;

    try {
        const result = await GamesService.createGame(data);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const updateGame = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const result = await GamesService.updateGame(data, id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const deleteGame = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await GamesService.deleteGame(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const changeGamesOrder = async (req, res) => {
    try {
        const result = await GamesService.changeGamesOrder(req.body);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

module.exports = {
    getGames,
    getGameById,
    getGameImage,
    getGamesNumber,
    createGame,
    updateGame,
    deleteGame,
    getPublishedGames,
    changeGamesOrder
};