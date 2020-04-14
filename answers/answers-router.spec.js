const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');
const Amodel = require('./answers-model');

const userdevAnswerTestHelper = require('./__mocks__/userdev-answer-test-helper');
const badAnswerTestHelper = require('./__mocks__/bad-answer-test-helper');
let userDevCookie;
let badCookie;
beforeAll(  async () => {
    await db.seed.run();

            const cookies = userdevAnswerTestHelper();
            userDevCookie = cookies;
    
       
            const cookie = badAnswerTestHelper();
            badCookie = cookie;    
});


afterAll( async () => {
    await db.destroy();
})

// function userCookieRequest() {
//     supertest(server)
//         .post('/api/login')
//         .send({ username: 'mickey65', password: '123' })
//         .expect(200)
//         .then((res) =>{
//             // const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
//             // cookie = cookies.join(';');
//             const cookies = process.env.USER_TEST_TOKEN;
//             return userCookie = cookies;
//         })
// }
// let userCookie = userCookieRequest();


describe('answer invalid credentials', () => {
    describe('no token no access to answer', () => {
        test('401 POST /api/question/:id/answer', async () => {
            
            const res = await supertest(server)
                .post('/api/question/9/answers')
                .send({
                    title: 'answer title',
                    solution: 'solution',
                    comments: 'solution comments',
                    best_answer: false,
                    question_id: 9,
                    dev_id: 5
                }).set('Cookie', badCookie)

            expect(res.statusCode).toBe(401);
            expect(res.type).toBe('application/json');
            expect(res.body.message).toMatch(/invalid credentials/i);
        });
    })
})

    // describe('answer route question not exist', () => {
    //     describe('404 question not exist', () => {
    //         test('POST /api/question/50/answer', async () => {

    //         const res = await supertest(server)
    //             .post('/api/question/50/answer')
    //             .send({
    //                 title: 'answer title',
    //                 solution: 'solution',
    //                 comments: 'solution comments',
    //                 best_answer: false,
    //                 question_id: 50,
    //                 dev_id: 7
    //             }).set('Cookie', userDevCookie);
                
    //             expect(res.statusCode).toBe(404);
    //             expect(res.type).toBe('application/json');
    //             expect(res.body.message).toMatch(/question id does not exist/i);
    //         })
    //     })
    // })


describe('answers routes', () => {
    describe('credential fail for users', () => {
        test('POST /api/question/:id/answer', async () => {

            const res = await supertest(server)
                .post('/api/question/9/answers')
                .send({
                    title: 'answer title',
                    solution: 'solution',
                    comments: 'solution comments',
                    best_answer: false,
                    question_id: 9,
                    dev_id: 3
                }).set('Cookie', badCookie);

            expect(res.statusCode).toBe(401);
            expect(res.type).toBe('application/json');
        });
    })


    describe('user-dev POST answer => question', () => {
        test('POST /api/question/:id/answer', async () => {

            const res = await supertest(server)
                .post('/api/question/9/answers')
                .send({
                    title: 'title answer',
                    solution: 'solution box',
                    comments: 'comments',
                    best_answer: false,
                    question_id: 9,
                    dev_id: 7
                }).set('Cookie', userDevCookie);

            expect(res.statusCode).toBe(201);
            expect(res.type).toBe('application/json');

            expect(res.body.title).toBe('title answer');
            expect(res.body.solution).toBe('solution box');
            expect(res.body.username).toBe('userdev');
            
        })

        describe('updateAnswer route', () => {
            test('PUT /api/question/:id/answer/:answerId', async () => {
                const res = await supertest(server)
                    .put('/api/question/3/answer/3')
                    .send({
                        title: 'knexJS',
      solution: 'you need the knex package installed `npm i knex` to install.',
      comments: 'update comments',
      best_answer: false,
      question_id: 3,
      dev_id: 6
                    }).set('Cookie', userDevCookie);

            expect(res.statusCode).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body.comments).toMatch(/update comments/i);
            })
        })
    })
})
