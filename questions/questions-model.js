/** @format */

const db = require('../data/config');

module.exports = {
  unansweredQuestions,
  unansweredById,
  answeredQuestions,
  addQuestion,
  questionById,
  getQuestionAnswers
  // allQuestionsAndAnswers,
};

function unansweredQuestions() {
  return db('questions as q')
    .select(
      'q.id as id',
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
      'q.id as id',
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

function answeredQuestions() {
  return db('questions as q')
    .select(
      'q.id as id',
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
      'q.id as id',
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

function getQuestionAnswers(question_id) {
  return db('questions as q')
    .select(
      'a.title as title',
      'a.solution as solution',
      'a.comments as comments',
      'a.best_answer as best_answer',
      'd.username as username',
      'q.id as question_id'
    )
    .join('answers as a', 'a.question_id', 'q.id')
    .join('users as d', 'a.dev_id', 'd.id')
    .where('q.id', question_id);
}
