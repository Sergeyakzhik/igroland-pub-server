const BrochuresService = require('../services/brochures.services');
const errorEnvelope = require('../utils').errorEnvelope;

const sendOrder = async (req, res) => {
    try {
        const result = await BrochuresService.sendOrder(req.body);

        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    } 
};

module.exports = {
    sendOrder
};