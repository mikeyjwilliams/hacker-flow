/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
	getUsers,
	findBy,
	findById,
	addUser,
	addRole,
	findByIdRole
	//deleteUser,
};

function getUsers() {
	return db('users').select('id', 'username', 'first_name', 'last_name');
}

function findBy(filter) {
	return db('users')
		.where(filter)
		.select('id', 'username', 'email', 'first_name', 'last_name');
}

function findById(id) {
	return db('users')
		.select('id', 'username', 'first_name', 'last_name')
		.where({ id })
		.first();
}

async function addUser(user) {
	const [id] = await db('users').insert(user);

	return findById(id);
}

async function addRole(role = 'user-dev') {
	const [id] = await db('roles').insert(role);

	return findByIdRole(id);
}

function findByIdRole(id) {
	return db('roles').where({ id }).select('id', 'role').first();
}
//!! Foreign key constraints this.
// function deleteUser(id) {
//   return db('users')
//     .where({ id })
//     .del();
// }
