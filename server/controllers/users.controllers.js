const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const UsersService = require('../services/users.services');
const errorEnvelope = require('../utils').errorEnvelope;

const SALT_ROUNDS = 10;

const getUserInfo = (req, res) => {
    res.status(200).json(req.user);
};

const login = async (req, res) => {
    const { username, password } = req.body;
    let result;

    try {
        result = await UsersService.login({ where: { username } });
    } catch (err) {
        console.log(err);
        res.status(400).json(errorEnvelope('Server Error'));
    }

    if (!result) {
		res.status(400).json(errorEnvelope('Wrong username or password'));
		return;
    }
    
    const { password: dbPassword } = result.dataValues;

    bcrypt.compare(password, dbPassword, (err, isRight) => {
        if (err) {
            console.log(err)
            res.status(500).json(errorEnvelope('Server error'));
            return;
        }

        if (isRight) {
            const { id, username } = result.dataValues;
            const user = { id, username };

            jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
                if (err) {
                    res.status(500).json(errorEnvelope('Server error'));
                    return;
                } else {
                    res.status(200).json({ token, id, username });
                }
            })
        } else {
            res.status(400).json(errorEnvelope('Wrong username or password'));
        }
    });
};

const signup = async (req, res) => {
    const { username, password } = req.body;

    let result = await UsersService.isUserExists({ where: { username } });

    if (result) {
		res.status(400).json(errorEnvelope('User with same username already exists'));
		return;
    }

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        bcrypt.hash(password, salt, null, async (err, hashedPassword) => {
            const userData = { username: req.body.username, password: hashedPassword };

            result = await UsersService.createUser(userData);

            const { id, username } = result.dataValues;
            const user = { id, username };

            jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
                res.json({ token, id, username });
            });
        });
    });
};

module.exports = {
    getUserInfo,
    login,
    signup
};