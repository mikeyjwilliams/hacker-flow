const db = require('../data/config');
const QuestModel = require('./questions-model');

afterEach( async () => {
    await db.seed.run();
})

describe('questions models', () => {
    describe('questions based off of question_status', () => {
       test('get unasnwered questions', async () => {
        const res = await QuestModel.unansweredQuestions();

        expect(res).toHaveLength(7)
       }) 
    })
}
