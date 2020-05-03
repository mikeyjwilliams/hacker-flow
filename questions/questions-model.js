/** @format */

const db = require('../data/config');

module.exports = {
  unansweredQuestions,
  unansweredById,
  answeredQuestions,
  answeredById,
  addQuestion,
  questionById,
  getAllQuestionAnswers,
  getAllQuestions,
  getQuestionAndAnswers,
  updateQuestion,
};

function unansweredQuestions() {
  return db('questions as q')
    .select(
      'q.id as question_id',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'q.user_id', 'u.id')
    .where('q.solved', false);
}

function unansweredById(id) {
  return db('questions as q')
    .select(
      'q.id as question_id',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'q.user_id', 'u.id')
    .where('q.solved', false)
    .where('q.id', id)
    .first();
}

function answeredById(id) {
  return db('questions as q')
    .select(
      'q.solved as solved',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'q.user_id', 'u.id')
    .where({ 'q.solved': true, 'q.id': id })
    .first();
}

function answeredQuestions() {
  return db('questions as q')
    .select(
      'q.id as question_id',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'q.user_id', 'u.id')
    .where('q.solved', true);
}

function questionById(id) {
  return db('questions as q')
    .where('q.id', id)
    .select(
      'q.id as question_id',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'u.id', 'q.user_id')
    .first();
}

async function addQuestion(question) {
  const [id] = await db('questions').insert(question);

  return questionById(id);
}

// function allQuestionsAndAnswers() {

// }

function getAllQuestionAnswers(question_id) {
  return db('questions as q')
    .select(
      'a.title as title',
      'a.solution as solution',
      'a.comments as comments',
      'a.best_answer as best_answer',
      'u.username as username',
      'q.id as question_id',
      'a.id as answer_id'
    )
    .join('answers as a', 'a.question_id', 'q.id')
    .join('users as u', 'a.user_id', 'u.id')
    .where('q.id', question_id);
}

function getAllQuestions() {
  return db('questions as q')
    .select(
      'q.id as question_id',
      'q.solved as solved',
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('users as u', 'q.user_id', 'u.id');
}

function getQuestionAndAnswers(question_id) {
  return db('questions as q')
    .select(
      'q.id as question_id',
      'q.title as question_title',
      'q.category as question_category',
      'q.question as question_question',
      'q.attempt_tried as question_attempt_tried',
      'q.comments as question_comments',
      'q.solved as question_solved',
      'user.username as question_username',
      'a.id as answer_id',
      'a.title as answer_title',
      'a.solution as answer_solution',
      'a.comments as answer_comments',
      'a.best_answer as answer_best_answer',
      'answer.username as answer_username'
    )
    .join('answers as a', 'a.question_id', 'q.id')
    .join('users as user', 'q.user_id', 'user.id')
    .join('users as answer', 'a.user_id', 'answer.id')
    .where('q.id', question_id);
}

async function updateQuestion(id, changes) {
  await db('questions').where({ id }).update(changes);

  return questionById(id);
}
