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

  knex.schema.createTable('answers', tbl => {
    tbl.increments('id');
    tbl.string('title', 240).notNullable();
    tbl.text('solution').notNullable();
    tbl.text('comments').nullable();
    tbl
      .integer('dev_id')
      .references('id')
      .inTable('users');
  });

  knex.schema.createTable('question_statuses', tbl => {
    tbl.increments('id');
    tbl
      .boolean('best_answer')
      .notNullable()
      .defaultTo('false');
    tbl
      .boolean('solved')
      .notNullable()
      .defaultTo('false');
    tbl
      .integer('question_id')
      .references('id')
      .inTable('questions');
    tbl
      .integer('answer_id')
      .references('id')
      .inTable('answers');
  });
};

exports.down = async function(knex) {
  knex.schema.dropTablesIfExist('question_statuses');
  knex.schema.dropTablesIfExist('answers');
  knex.schema.dropTablesIfExist('questions');
  knex.schema.dropTablesIfExist('users');
};
