/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
	getUsers,
	findBy,
	findById,
	findPassByUser,
	addUser
	//deleteUser,
};

function getUsers() {
	return db('users').select(
		'id',
		'username',
		'email',
		'first_name',
		'last_name',
		'role'
	);
}

function findBy(filter) {
	return db('users')
		.where(filter)
		.select('id', 'username', 'email', 'first_name', 'last_name', 'role');
}

function findById(id) {
	return db('users')
		.select('id', 'username', 'email', 'first_name', 'last_name', 'role')
		.where({ id })
		.first();
}

function findPassByUser(filter) {
	return db('users')
		.select('id', 'username', 'password', 'email', 'role')
		.where(filter)
		.first();
}

async function addUser(user) {
	user.password = await bcrypt.hash(user.password, 10);
	const [id] = await db('users').insert(user);

	return findById(id);
}
//!! Foreign key constraints this.
// function deleteUser(id) {
//   return db('users')
//     .where({ id })
//     .del();
// }
