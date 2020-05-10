/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
	getUsers,
	getUser,
	findBy,
	findById,
	addUser
	//deleteUser,
};

function getUsers() {
	return db('users').select('id', 'username', 'first_name', 'last_name');
}

function getUser(user_id) {
	return db('users as u')
		.select(
			'u.id as user_id',
			'u.username as username',
			'u.first_name as first_name',
			'u.last_name as last_name',
			's.email as email',
			's.id as main_id'
		)
		.join('sign_ins as s', 'u.sign_in_id', 's.id')
		.where('u.id', user_id)
		.first();
}

function findBy(filter) {
	return db('users')
		.where(filter)
		.select('id', 'username', 'first_name', 'last_name');
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

//!! Foreign key constraints this.
// function deleteUser(id) {
//   return db('users')
//     .where({ id })
//     .del();
// }
