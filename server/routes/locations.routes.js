const express = require('express');

const LocationsController = require('../controllers/locations.controllers');
const verifyToken = require('./middleware').verifyToken;

const locationsRouter = express.Router();

locationsRouter.get('/', verifyToken, LocationsController.getLocations);

locationsRouter.get('/published', LocationsController.getPublishedLocations);

locationsRouter.get('/location/:id', LocationsController.getLocationById);

locationsRouter.get('/count', LocationsController.getLocationsNumber);

locationsRouter.post('/create-location', verifyToken, LocationsController.createLocation);

locationsRouter.put('/location/:id', verifyToken, LocationsController.updateLocation);

locationsRouter.put('/order', verifyToken, LocationsController.changeLocationsOrder);

locationsRouter.put('/location/:id/publish', verifyToken, LocationsController.setPublished);

locationsRouter.delete('/:id', verifyToken, LocationsController.deleteLocation);

module.exports = locationsRouter;