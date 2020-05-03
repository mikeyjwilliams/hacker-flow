/** @format */

const db = require('../data/config');
const bcrypt = require('bcryptjs');

module.exports = {
  findByPass,
  findById,
};

function findByPass(filter) {
  return db('sign_ins').where(filter).select('email', 'password');
}

function findById(id) {
  return db('sign_ins').where({ id }).select('id', 'email');
}
