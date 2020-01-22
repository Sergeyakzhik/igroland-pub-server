const Users = require('../models/users.models');

const login = async (query) => {
    return await Users.findOne(query);
}

const isUserExists = async (query) => {
    return await Users.findOne(query);
};

const createUser = async (query) => {
    return await Users.create(query);
};

module.exports = {
    login,
    isUserExists,
    createUser
};