const db = require('../data/config');

module.exports = {
    findById,
    addAnswer,
    updateAnswer,
    removeAnswer,

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
    const [id] = await  db('answers').insert(answer);

    return findById(id);
}

async function updateAnswer(id, changes) {
    return null;
}

function removeAnswer(id) {
    return null;
}

