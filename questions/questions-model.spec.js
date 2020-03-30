const db = require('../data/config');
const QuestModel = require('./questions-model');

afterEach( async () => {
    await db.seed.run();
})

describe('questions models', () => {
    describe('questions based off of question_status', () => {
       test('get unanswered questions', async () => {
        const res = await QuestModel.unansweredQuestions();

        expect(res).toHaveLength(6)
       }) 

       test('get answered questions', async () => {
           const res = await QuestModel.answeredQuestions();

           expect(res).toHaveLength(1);
       })
    })


})
