/** @format */

const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').insert([
    {
      // # 1 user
      username: 'mickey65',
      password: bcrypt.hashSync('123', 10),
      email: 'mickey@gmail.com',
      first_name: 'mickey',
      last_name: 'mouse',
      role: 'user',
    },
    {
      // # 2 user
      username: 'bri34fal',
      password: bcrypt.hashSync('abc123', 10),
      email: 'brianfallon@hotmail.com',
      first_name: 'brian',
      last_name: 'fallon',
      role: 'user',
    },
    {
      // # 3 user
      username: 'trippygoof#2',
      password: bcrypt.hashSync('abc', 10),
      email: 'gooft345@outlook.com',
      first_name: 'goofy',
      last_name: 'dog',
      role: 'user',
    },
    {
      // # 4 user
      username: 'menzinger54',
      password: bcrypt.hashSync('34Dc', 10),
      email: 'menzingers@gmail.com',
      first_name: 'matt',
      last_name: 'jones',
      role: 'user',
    },
    {
      // # 5 DEV
      username: 'mikey1',
      password: bcrypt.hashSync('abc123', 10),
      email: 'mikey123@gmail.com',
      first_name: 'miguel',
      last_name: 'williamson',
      role: 'dev',
    },
    {
      // # 6 DEV
      username: 'delaney3',
      password: bcrypt.hashSync('del45', 10),
      email: 'delannee45@gmail.com',
      first_name: 'delaney',
      last_name: 'apples',
      role: 'dev',
    },
  ]);
};
