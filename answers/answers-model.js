const db = require('../data/config');

module.exports = {
    getQuestionAnswers,
    findById,
    addAnswer,
    updateAnswer,
    removeAnswer,

}

function getQuestionAnswers(question_id) {
    return db('answers as a')
    .select('a.title as title',
            'a.solution as solution',
            'a.comments as comments',
            'a.best_answer as best_answer',
            'd.username as username'
            )
    .join('users as d', 'dev_id', 'd.id')
    .join('questions as q', 'a.question_id', "q.id")
    .where('q.id', question_id);
}

function findById(id) {
    return db('answers as a')
    .select('a.title as title',
            'a.solution as solution',
            'a.comments as comments',
            'a.best_answer as best_answer',
            'd.username as username'
            )
    .join('users as d', 'dev_id', 'd.id')
    .where('a.id', id).first();
}

async function addAnswer(answer) {
    return null; 
}

async function updateAnswer(id, changes) {
    return null;
}

function removeAnswer(id) {
    return null;
}