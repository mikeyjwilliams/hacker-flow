/** @format */

const bcrypt = require('bcryptjs');
const db = require('../data/config');
const uuidv1 = require('uuid/v1');

module.exports = {
  findUser,
  addUser,
};

function findUser(id) {
  return db('sign_in').where({ id }).select('id', 'email', 'password');
}

async function addUser(user) {
  user.password = await bcrypt.hash(user.password, 10);
  let [id] = await db('sign_in').insert(user);
  id = uuidv1();

  return findUser(id);
}
