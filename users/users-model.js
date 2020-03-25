/** @format */

const db = require('../data/config');
const argon2 = require('argon2');

module.exports = {
  getUsers,
  findBy,
  findById,
  findPassByUser,
  addUser,
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
    .select('username', 'password', 'email')
    .where(filter)
    .first();
}

async function addUser(user) {
  user.password = await argon2.hash(user.password);
  const [id] = await db('users').insert(user);

  return findById(id);
}
//!! Foreign key constraints this.
// function deleteUser(id) {
//   return db('users')
//     .where({ id })
//     .del();
// }
