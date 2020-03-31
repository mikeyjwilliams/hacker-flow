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

    describe('question by ID', () => {
        test('questionById', async () => {
            const res = await QuestModel.questionById(1);

            expect(res.category).toMatch(/node.js/i);
            expect(res.comments).toBe('n/a');
            expect(res.username).toMatch(/mickey65/i);
        })
    })

    describe('add a question', () => {
        test('insert question', async () => {
            const res = await QuestModel.addQuestion({
                title: 'blank',
                category: 'history',
                question: 'who created node.js',
                attempt_tried: 'n/a',
                comments: 'n/a',
                user_id: 2,
            })

            expect(res.title).toMatch(/blank/i);
            expect(res.category).toMatch(/history/i);
            expect(res.username).toMatch('bri34fal');
        })
    })


})
