/** @format */

const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');
// // testing below. -----

const badCookieTest = require('./__mocks__/bad-question-test-helper');

// const userDevCookieTest = require('./__mocks__/userdev-question-test-helper');

let badCookie = badCookieTest();
// let questionCookie;
let user = null;
let cookie;
beforeAll(async () => {
  const reg = await supertest(server)
    .post('/api/register')
    .send({ email: 'magic@hotmail.com', password: '123' });
  const login = await supertest(server)
    .post('/api/login')
    .send({ email: 'magic@gmail', password: '123' });
  user = await supertest(server).post('/api/usersetup').send({
    username: 'magicman',
    first_name: 'mikey',
    last_name: 'johnson',
    sign_in_id: login.id,
  });
  cookie = user.cookie;
});

afterAll(async () => {
  await db.destroy();
});

describe('questions routes', () => {
  describe('failure tests', () => {
    test('401 GET /api/unanswered', async () => {
      const res = await supertest(server)
        .get('/api/unanswered')
        .set('Cookie', badCookie);

      expect(res.statusCode).toBe(401);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/invalid credentials/i);
    });

    test('401 GET /api/unanswered/:id', async () => {
      const res = await supertest(server)
        .get('/api/unanswered/1')
        .set('Cookie', badCookie);

      expect(res.statusCode).toBe(401);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });

  // describe('200 GET /api/unanswered', () => {
  //   test('get unanswered questions', async () => {
  //     const response = await supertest(server)
  //       .get('/api/unanswered')
  //       .set(cookie);

  //     expect(response.statusCode).toBe(200);
  //     expect(response.type).toBe('application/json');
  //   });
  // });

  //         describe('GET /question/:id/answers-only route', () => {
  //             test('no questions to display, return 404 and  no answers message', async () => {
  //                 const res = await supertest(server)
  //                 .post('/api/question/5/answers-only')
  //                 .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(404);
  //                 expect(res.type).toBe('application/json');
  //             })

  //             test('display answers for a specific question w/o question.', async () => {
  //                 const res = await supertest(server)
  //                 .get('/api/question/3/answers-only')
  //                 .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(200);
  //                 expect(res.type).toBe('application/json');
  //                 expect(res.body).toHaveLength(2);
  //             })
  //         })

  //         describe('GET /all-questions', () => {
  //             test('all questions displayed whether they have an answer or not', async () => {
  //                 const res = await supertest(server)
  //                     .get('/api/all-questions').set('Cookie', questionCookie);

  //                 expect(res.body.length).toBeGreaterThan(7);
  //                 expect(res.body.length).toBeLessThan(10);
  //                 expect(res.body).toHaveLength(9);
  //             })
  //         })

  //         describe('PUT /question/:id update question', () => {
  //             test('update a questions data', async () => {
  //                 const res = await supertest(server)
  //                     .put('/question/9')
  //                     .send({
  //                         title: 'node creator',
  //                         category: 'node.js',
  //                         question: 'who created node.js?',
  //                         attempt_tried: 'I looked through the docs...',
  //                         comments: 'I was wondering who created node.js for a report',
  //                         solved: false,
  //                         user_id: 7,
  //                     })
  //                     .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(200);
  //                 expect(res.type).toBe('application/json');
  //                 expect(res.body.attempt_tried).toMatch(/i looked through the docs.../i);
  //             })
  //         })

  //         describe('GET /question/:id/answers', () => {
  //             test('question plus all answers', async () => {
  //                 const res = await supertest(server)
  //                     .get('/api/question/3/answers')
  //                     .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(200);
  //                 expect(res.type).toBe('application/json');
  //                 expect(res.body).toHaveLength(2);

  //             })

  //             test('question has no answers', async () => {
  //                 const res = await supertest(server)
  //                 .get('/api/question/7/answers')
  //                 .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(404);
  //                 expect(res.body.message).toMatch(/sorry this question has no answers/i);
  //             })
  //         })

  //         describe('GET /answered route, answeredQuestions model', () => {
  //             test('display answered questions only', async () => {
  //                 const res = await supertest(server)
  //                     .get('/api/answered')
  //                     .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(200);
  //                 expect(res.type).toBe('application/json');
  //                 expect(res.body).toHaveLength(3);
  //             })
  //         })

  //         describe('GET /answered/:id route, answeredQuestions model', ()=> {
  //             test('display a specific answered question only', async () => {
  //                 const res = await supertest(server)
  //                     .get('/api/answered/1')
  //                     .set('Cookie', questionCookie);

  //                 expect(res.statusCode).toBe(200);
  //                 expect(res.type).toBe('application/json');
  //                 expect(res.body.category).toBe('node.js');
  //                 expect(res.body.comments).toBe('n/a');
  //                 expect(res.body.username).toMatch(/mickey65/i);
  //             })
  //         })
});
