const Locations = require('../models/locations.models');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const getLocations = async () => {
    try {
        const data = await Locations.findAll({});

        prepareLocationsData(data);

        return data;
    } catch (err) {
        throw err;
    }    
};

const getPublishedLocations = async () => {
    try {
        const data = await Locations.findAll({});

        prepareLocationsData(data, true);

        return data;
    } catch (err) {
        throw err;
    } 
};

const getLocationById = async (id) => {
    return await Locations.findOne({
        where: { id }
    });
};

const getLocationsNumber = () => {
    return Locations.count();
};

const createLocation = async query => {
    return await Locations.create(query);
};

const updateLocation = async (data, id) => {
    return await Locations.update(data, { where: { id } });
};

const setPublished = (data, id) => {
    return Locations.update(data, { where: { id } });
};

const deleteLocation = async (query) => {
    return await Locations.destroy(query);
};

const changeLocationsOrder = orderArr => {
    return Promise.all(orderArr.map((item, ind) => Locations.update({ order: ind }, { where: { id: item } })));
};

const prepareLocationsData = (data, setOffset) => {
    parseCoordinates(data);
    setOffset && setCoordinatesOffsets(data);

    data.sort((a, b) => a.order - b.order);
};

const parseCoordinates = data => {
    data.forEach(item => {
        item.coordinates = Object.values(JSON.parse(item.coordinates)).map(item => parseFloat(item, 10))
    });
}

const setCoordinatesOffsets = data => {
    const pins = [];

    data.sort((a, b) => a.coordinates[1] - b.coordinates[1]); 

    for (let i = 0, j = 0; i < data.length - 1; i++) {
        while (Math.abs(data[i].coordinates[1] - data[i + 1].coordinates[1]) <= 1) {
            if (Math.abs(data[i].coordinates[0] - data[i + 1].coordinates[0]) <= 1) {
                if (!pins[j]) {
                    pins[j] = [i];
                }

                pins[j].push(i + 1);
            }

            i += 1;
        }

        if (pins[j]) {
            j += 1;
        }
    }

    pins.forEach(arr => {
        const n = arr.length;
        const r = n * 0.1;
        const angle = 2 * 3.14 / n;
        const startX = arr.map(item => data[item].coordinates[1]).reduce((a, b) => a + b) / arr.length;
        const startY = arr.map(item => data[item].coordinates[0]).reduce((a, b) => a + b) / arr.length;

        arr.forEach((pinInd, ind) => {
            const x = r * Math.cos(ind * angle);
            const y = r * Math.sin(ind * angle);

            data[pinInd].coordinates[1] = startX + x;
            data[pinInd].coordinates[0] = startY + y;
        }); 
    });
};

module.exports = {
    getLocations,
    getPublishedLocations,
    getLocationById,
    getLocationsNumber,
    createLocation,
    updateLocation,
    deleteLocation,
    setPublished,
    changeLocationsOrder
};