/** @format */

const db = require('../data/config');

module.exports = {
  unansweredQuestions,
  unansweredById,
  answeredQuestions,
  addQuestion,
  questionById
};

function unansweredQuestions() {
  return db('questions as q')
    .select(
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
  return (
    db('question as q')
      // .distinct('q.id')
      .select(
        'q.title as title',
        'q.category as category',
        'q.question as question',
        'q.attempt_tried as attempt_tried',
        'q.comments as comments',
        'u.username as username'
      )
      .join('users as u', 'q.user_id', 'u.id')
      .where('q.solved', true)
  );
}

function questionById(id) {
  return db('questions as q')
    .where('q.id', id)
    .select(
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
