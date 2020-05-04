/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
  findByPass,
  findBy,
  findById,
  addUser,
};

function findByPass(filter) {
  return db('sign_ins').where(filter).select('id', 'email', 'password').first();
}

function findById(id) {
  return db('sign_ins').where({ id }).select('id', 'email').first();
}

function findBy(filter) {
  return db('sign_ins').where(filter).select('id', 'email');
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 10);

  const [id] = await db('sign_ins').insert(user);

  return findById(id);
}
