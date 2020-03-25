/** @format */

const db = require('../data/config');
const argon2 = require('argon2');

module.exports = {
  findBy,
  findById,
  findPassByUser,
  addUser,
  updateUser,
  getUsers,
};

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
  return null;
}

async function updateUser(id, updates) {}

function getUsers() {
  return null;
}
