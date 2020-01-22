const jwt = require('jsonwebtoken');

const errorEnvelope = require('../utils').errorEnvelope;

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers['authorization']; 

	if (!bearerHeader) {
		res.status(403).json(errorEnvelope('Forbidden'));
	}

	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];

	jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
		if(err) {
			res.status(403).json(errorEnvelope('Forbidden'));
		}
		const { id, username } = authData;

		req.user = { id, username };
	});
	
	next();
};

module.exports.verifyToken = verifyToken;

