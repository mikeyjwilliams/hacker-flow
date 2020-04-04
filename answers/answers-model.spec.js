const db = require('../data/config');
const Amodel = require('./answers-model');

beforeEach(async () => {
    await db.seed.run();
})

afterAll( async () => {
    await db.destroy();
})

describe('Answer models', () => {
    describe('receive answer models', () => {
        test('get all answers for a question', async () => {
            const res = await Amodel.getQuestionAnswers(1);

            expect(res.length).toBeGreaterThanOrEqual(1);
        });

        test('0 result no answers for question', async () => {
            const res = await Amodel.getQuestionAnswers(4);

            expect(res.length).toBeFalsy();
        });
    });

    describe('answer by id', () => {
        test('find an answer by id', async () => {
            const res = await Amodel.findById(2);

            expect.objectContaining({
                title: expect.any(String),
                solution: expect.any(String),
                comments: expect.any(String),
                best_answer: expect.any(Boolean)
            })
        })
    })

    describe('insert an answer return findById', () => {
        test('insert an answer', async () => {

            const add = {
                title: 'blank',
                solution: 'test solution',
                comments: 'test comment',
                best_answer: false,
                question_id: 1,
                dev_id: 6,
            };

            const res = await Amodel.addAnswer(add);

            expect(res.title).toMatch(/blank/i);
            expect(res.solution).toMatch(/test solution/i);
            expect(res.comments).toMatch(/test comment/i);
            expect(res.username).toMatch(/delaney3/i);
        })
    })

})
