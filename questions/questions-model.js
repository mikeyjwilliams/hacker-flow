/** @format */

const db = require('../data/config');

module.exports = {
  unansweredQuestions,
  unansweredById,
  answeredQuestions
};

function unansweredQuestions() {
  return db('question_statuses as qs')
    .distinct('q.id')
    .select(
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('questions as q', 'qs.question_id', 'q.id')
    .join('users as u', 'q.user_id', 'u.id')
    .where('qs.solved', false);
}

function unansweredById(id) {
  return db('question_statuses as qs')
    .distinct('q.id')
    .select(
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('questions as q', 'qs.question_id', 'q.id')
    .join('users as u', 'q.user_id', 'u.id')
    .where('qs.solved', false)
    .where('q.id', id)
    .first();
}

function answeredQuestions() {
  return db('question_statuses as qs')
    .distinct('q.id')
    .select(
      'q.title as title',
      'q.category as category',
      'q.question as question',
      'q.attempt_tried as attempt_tried',
      'q.comments as comments',
      'u.username as username'
    )
    .join('questions as q', 'qs.question_id', 'q.id')
    .join('users as u', 'q.user_id', 'u.id')
    .where('qs.solved', true);
}
