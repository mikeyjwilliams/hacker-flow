/** @format */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('answers').truncate();
  await knex('questions').truncate();
  await knex('roles').truncate();
  await knex('users').truncate();
  await knex('sign_ins').truncate();
};
