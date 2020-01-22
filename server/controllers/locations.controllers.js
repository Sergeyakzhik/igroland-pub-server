const LocationsService = require('../services/locations.services');
const errorEnvelope = require('../utils').errorEnvelope;

const getLocations = async (req, res) => {
    try {
        const result = await LocationsService.getLocations();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getPublishedLocations = async (req, res) => {
    try {
        const result = await LocationsService.getPublishedLocations();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(errorEnvelope(err.message));
    }
};

const getLocationById = async (req, res) => {
    const id = req.params.id;
    let result;

    try {
        result = await LocationsService.getLocationById(id);
    } catch (err) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const getLocationsNumber = async (req, res) => {
    const result = await LocationsService.getLocationsNumber();

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const createLocation = async (req, res) => {
    const data = req.body;

    const result = await LocationsService.createLocation(data);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const updateLocation = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await LocationsService.updateLocation(data, id);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const setPublished = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await LocationsService.setPublished({ published: data.published }, id);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const deleteLocation = async (req, res) => {
    const id = req.params.id;
    let result;

    try {
        result = await LocationsService.deleteLocation({ where: { id } });
    } catch (err) {
        console.log(err)
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const changeLocationsOrder = async (req, res) => {
    const result = await LocationsService.changeLocationsOrder(req.body);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

module.exports = {
    createLocation,
    getPublishedLocations,
    getLocationById,
    getLocationsNumber,
    getLocations,
    updateLocation,
    setPublished,
    deleteLocation,
    changeLocationsOrder
};