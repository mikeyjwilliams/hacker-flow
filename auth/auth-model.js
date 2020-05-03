/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
  findByPass,
  findById,
  addUser,
};

function findByPass(filter) {
  return null;
  //   return db('sign_ins').where(filter).select('email', 'password');
}

function findById(id) {
  return null;
  //   return db('sign_ins').where({ id }).select('id', 'email');
}

async function addUser(user) {
  return null;
  //   user.password = await bcrypt.hash(user.password, 10);

  //   const [id] = await db('sign_ins').insert(user);

  //   return findById(id);
}
