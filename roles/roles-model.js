/** @format */

const db = require('../data/config');

module.exports = {
  addRole,
  findByIdRole,
};

async function addRole(user_id, role = { role: 'user-dev', user_id: user_id }) {
  const [id] = await db('roles').where('id', user_id).insert(role);

  return findByIdRole(id);
}

function findByIdRole(id) {
  return db('roles').where({ id }).select('id', 'role', 'user_id').first();
}
