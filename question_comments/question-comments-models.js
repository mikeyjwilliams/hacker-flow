/** @format */

const db = require('../data/config');

module.exports = {
  commentById,
  allCommentsForUser,
  allCommentsForQuestion,
  addComment,
  updateComment,
  deleteComment,
};

function commentById(questionComment_id) {
  return db('question_comments as qc')
    .select(
      'qc.id as question_id',
      'qc.id as question_id',
      'qc.comment as comment',
      'u.username as username'
    )
    .join('users as u', 'qc.user_id', 'u.id')
    .where('qc.id', questionComment_id)
    .first();
}

function allCommentsForUser(user_id) {
  return db('question_comments as qc')
    .select('qc.comment as comment', 'u.username as username')
    .join('users as u', 'qc.user_id', 'u.id')
    .where('qc.user_id', user_id);
}

function allCommentsForQuestion(question_id) {
  return db('question_comments as qc')
    .select('qc.comment as comment', 'u.username as username')
    .join('users as u', 'qc.user_id', 'u.id')
    .where('qc.question_id', question_id);
}

async function addComment(comment) {
  const [id] = await db('question_comments').insert(comment);

  return commentById(id);
}

async function updateComment(question_id, update) {
  await db('question_comments').where('id', question_id).update(update);

  return commentById(question_id);
}

function deleteComment(question_id) {
  return db('question_comments').where({ id: question_id }).del();
}
