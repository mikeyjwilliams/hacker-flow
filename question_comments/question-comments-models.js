/** @format */

const db = require('../data/config');

module.exports = {
  commentById,
  allComments,
  addComment,
  updateComment,
  deleteComment,
};

function commentById(comment_id) {
  return db('question_comments as qc')
    .select('qc.comment as comment', 'u.username as username')
    .join('users as u', 'qc.user_id', 'u.id')
    .where('qc.id', comment_id)
    .first();
}

function allComments(user_id) {
  return db('question_comments as qc')
    .select('qc.comment as comment', 'u.username as username')
    .join('users as u', 'qc.user_id', 'u.id')
    .where('qc.user_id', user_id);
}

async function addComment(question_id, comment) {
  return null;
}

async function updateComment(question_id, update) {
  return null;
}

function deleteComment(question_id) {
  return null;
}
