const db = require('../data/config');
const QuestModel = require('./questions-model');

afterEach( async () => {
    await db.seed.run();
})

describe('questions models', () => {
    describe('unanswered and answered questions all', () => {
       test('get unanswered questions', async () => {
        const res = await QuestModel.unansweredQuestions();

        expect(res).toHaveLength(6)
       }) 

       test('get answered questions', async () => {
           const res = await QuestModel.answeredQuestions();

           expect(res).toHaveLength(1);
       })
    })

    describe('single question models', () => {
        test('unansweredById', async () => {
            const res = await QuestModel.unansweredById(1);

            expect.objectContaining({
                title: expect.any(String),
                category: expect.any(String),
            })
            expect(res.username).toMatch(/mickey65/i);
        })
    })


})
