const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');
/**
 * sets up user token for 'dev' || 'user' according to database.
 * @param {*} user
 */
function genToken(user) {
	const payload = {
		userId: user.id,
		username: user.username,
		role: user.role
	};
	const options = {
		expiresIn: '25d'
	};
	return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = genToken;
