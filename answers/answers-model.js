const db = require('../../data/config');

module.exports = {
    findById,
    addAnswer,
    updateAnswer,
    removeAnswer,

}


/**
 * @for answer model
 * @description find answer by id
 * @param {answer} id 
 */
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

/**
 * @name addAnswer
 * @param {data} answer 
 * @description add answer to answer table display answer data back after.
 */
async function addAnswer(answer) {
    const [id] = await  db('answers').insert(answer);

    return findById(id);
}

async function updateAnswer(id, changes) {
    await db('answers').where({ id }).update(changes)
    ;

    return findById(id);
}

function removeAnswer(id) {
    return null;
}

