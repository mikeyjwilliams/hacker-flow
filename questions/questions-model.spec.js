const db = require('../data/config');
const QuestModel = require('./questions-model');

beforeEach( async () => {
    await db.seed.run();
})

afterAll( async () => {
    await db.destroy();
})

describe('questions models', () => {

    describe('unanswered questions', () => {
       test('get unanswered questions', async () => {
        const res = await QuestModel.unansweredQuestions();

        expect(res).toHaveLength(6);
       });

       });

    describe('answered questions', () => {
         test('get answered questions', async () => {
           const res = await QuestModel.answeredQuestions();

           expect(res).toHaveLength(3);
    })
    });


    describe('single question models', () => {
        test('unansweredById', async () => {
            const res = await QuestModel.unansweredById(4);

            expect.objectContaining({
                title: expect.any(String),
                category: expect.any(String),
            })
            
            expect(res.username).toMatch(/trippygoof#2/i);
        });
    });

    describe('question by ID', () => {
        test('questionById', async () => {
            const res = await QuestModel.questionById(1);

            expect(res.category).toMatch(/node.js/i);
            expect(res.comments).toBe('n/a');
            expect(res.username).toMatch(/mickey65/i);
        });
    
    });

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
        });
    });

describe('getAllQuestionAnswers', () => {
        test('get all answers for a question', async () => {
            const res = await QuestModel.getAllQuestionAnswers(1);

            expect(res.length).toBeGreaterThanOrEqual(1);
        });

        test('0 result no answers for question', async () => {
            const res = await QuestModel.getAllQuestionAnswers(4);

            expect(res.length).toBeFalsy();
        });

        test('exact num of answers for a question', async () => {
            const res = await QuestModel.getAllQuestionAnswers(3);

            expect(res).toHaveLength(2);
        });
    });

});
