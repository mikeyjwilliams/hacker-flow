/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
	findByPass,
	findById,
	addUser
};

function findByPass(filter) {
	return db('sign_ins').where(filter).select('email', 'password').first();
}

function findById(id) {
	return db('sign_ins').where({ id }).select('id', 'email');
}

async function addUser(user) {
	user.password = await bcrypt.hash(user.password, 10);

	const [id] = await db('sign_ins').insert(user);

	return findById(id);
}
