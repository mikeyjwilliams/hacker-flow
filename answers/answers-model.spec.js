const db = require('../data/config');
const Amodel = require('./answers-model');

beforeEach(async () => {
    await db.seed.run();
})

afterAll( async () => {
    await db.destroy();
})

describe('Answer models', () => {
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
    });

})
