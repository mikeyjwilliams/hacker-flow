/** @format */

exports.up = async function(knex) {
  knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username', 165)
      .notNullable()
      .unique();
    tbl.text('password').notNullable();
    tbl
      .string('username', 165)
      .notNullable()
      .unique();
    tbl.string('first_name', 125).notNullable();
    tbl.string('last_name', 125).notNullable();
  });

  knex.schema.createTable('questions', tbl => {
    tbl.increments('id');
    tbl
      .string('title', 240)
      .notNullable()
      .unique();
    tbl.string('category', 160).notNullable();
    tbl.text('question').notNullable();
    tbl.text('attempt_tried').nullable();
    tbl.text('comments').nullable();
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = async function(knex) {
  knex.schema.dropTablesIfExist('questions');
  knex.schema.dropTablesIfExist('users');
};
