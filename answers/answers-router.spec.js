const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');
const Amodel = require('./answers-model');


beforeAll( async () => {
    await db.seed.run();
});


afterAll( async () => {
    await db.destroy();
});



// describe('answer invalid credentials', () => {
//     describe('no token no access to answer', () => {
//         test('401 POST /api/question/:id/answer', async () => {
//             const res = supertest(server)
//                 .post('/api/question/9/answer')
//                 .send({
//                     title: 'answer title',
//                     solution: 'solution',
//                     comments: 'solution comments',
//                     best_answer: false,
//                     question_id: 9,
//                     dev_id: 5
//                 });
//             expect(res.statusCode).toBe(401);
//             expect(res.type).toBe('application/json');
//             expect(res.body.message).toMatch(/invalid credentials/i);
//         });
//         })
//     })

    // describe('answer route question not exist', () => {
    //     describe('404 question not exist', () => {
    //         test('POST /api/question/50/answer', async () => {

    //             const response = await supertest(server).post('/api/login').send({
    //               username: 'mikey1',
    //               password: 'abc123',
    //             })

    //                 const res = await supertest(server)
    //             .post('/api/question/50/answer')
    //             .send({
    //                 title: 'answer title',
    //                 solution: 'solution',
    //                 comments: 'solution comments',
    //                 best_answer: false,
    //                 question_id: 50,
    //                 dev_id: response.body.userId
    //             });
    //             console.log('RES ', res);
    //             expect(res.statusCode).toBe(404);
    //             expect(res.type).toBe('application/json');
    //             expect(res.body.message).toMatch(/question id does not exist/i);
    //         })
    //     })
    // })


// describe('answers routes', () => {
//     describe('credential fail for users', () => {
//         test('POST /api/question/:id/answer', async () => {


//             const res = await supertest(server)
//                 .post('/api/question/9/answer')
//                 .send({
//                     title: 'answer title',
//                     solution: 'solution',
//                     comments: 'solution comments',
//                     best_answer: false,
//                     question_id: 9,
//                     dev_id: 3
//                 });
//             expect(res.statusCode).toBe(403);
//             expect(res.type).toBe('application/json');
//             expect(res.body.message).toMatch(/access not granted/i);
//         });
//     })


//     describe('DEV POST answer => question', () => {
//         test('POST /api/question/:id/answer', async () => {


//             const res = await supertest(server)
//                 .post('/api/question/9/answer')
//                 .send({
//                     title: 'answer title',
//                     solution: 'solution',
//                     comments: 'solution comments',
//                     best_answer: false,
//                     question_id: 9,
//                     dev_id: dev_id
//                 });

//             expect(res.statusCode).toBe(201);
//             expect(res.type).toBe('application/json');

//             expect(res.body.title).toMatch(/answer title/i);
//             expect(res.body.solution).toMatch(/solution/i);
//             expect(res.body.best_answer).toBe(false);
//             expect(res.body.username).toMatch(/mikey1/i);
//         });
//     });

//     describe('user-dev POST answer => question', () => {
//         test('POST /api/question/:id/answer', async () => {



//             const res = await supertest(server)
//                 .post('/api/question/9/answer')
//                 .send({
//                     title: 'title answer',
//                     solution: 'solution box',
//                     comments: 'comments',
//                     best_answer: false,
//                     question_id: 9,
//                     dev_id: dev_id
//                 });

//             expect(res.statusCode).toBe(201);
//             expect(res.type).toBe('application/json');

//             expect(res.body.title).toBe('title answer');
//             expect(res.body.solution).toBe('solution box');
//             expect(res.best_answer).toBe(false);
//             expect(res.body.username).toBe('userdev');
//         })
//     })
// })


