/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers,
  findBy,
  findById,
  addUser,
  //deleteUser,
};

function getUsers() {
  return db('users').select('id', 'username', 'first_name', 'last_name');
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
