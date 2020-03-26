const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function genToken(user) {
	const payload = {
		userId: user.id,
		username: user.username,
		role: user.role
	};
	const options = {
		expiresIn: '3d'
	};
	return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = genToken;
