/** @format */

exports.up = async function (knex) {
  await knex.schema.createTable('sign_ins', (tbl) => {
    tbl.increments('id');
    tbl.string('email', 165).notNullable().unique();
    tbl.text('password').notNullable();
  });

  await knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('username', 165).notNullable().unique();
    tbl.string('first_name', 125).notNullable();
    tbl.string('last_name', 125).notNullable();
    tbl
      .integer('sing_in_id')
      .references('id')
      .inTable('sign_ins')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('roles', (tbl) => {
    tbl.increments('id');
    tbl.string('role', 15).notNullable().defaultTo('user-dev');
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('questions', (tbl) => {
    tbl.increments('id');
    tbl.string('title', 240).notNullable().unique();
    tbl.string('category', 160).notNullable();
    tbl.text('question').notNullable();
    tbl.text('attempt_tried').nullable();
    tbl.text('comments').nullable();
    tbl.boolean('solved').notNullable().defaultTo('false');
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await knex.schema.createTable('answers', (tbl) => {
    tbl.increments('id');
    tbl.string('title', 240).notNullable();
    tbl.text('solution').notNullable();
    tbl.text('comments').nullable();
    tbl.boolean('best_answer').notNullable().defaultTo('false');
    tbl
      .integer('question_id')
      .references('id')
      .inTable('questions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('answers');
  await knex.schema.dropTableIfExists('questions');
  await knex.schema.dropTableIfExists('roles');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('sign_ins');
};
