/** @format */

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('answer_comments').truncate();
	await knex('answers').truncate();
	await knex('question_comments').truncate();
	await knex('questions').truncate();
	await knex('roles').truncate();
	await knex('users').truncate();
	await knex('sign_ins').truncate();
};
