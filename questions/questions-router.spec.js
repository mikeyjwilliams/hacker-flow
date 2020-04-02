const supertest = require('supertest');
const server = require('../server');
// const genToken = require('../auth/genToken');
// const cookie = require('cookie-parser');
const db = require('../data/config');

const mockLoginData = {
  username: "mickey65",
  password: "123"
};

// const mockUserToken = {
//   role: 'user',
//   token:
//     "eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE8"
// };

// const mockDevToken = {
//   role: 'dev',
//   token:
//     "eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE9"
// };

// const mockNoToken = {
//     role: 'user',

// }

// jest.mock('cookie');

// const mockToken = {
//     'token':
//     "eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE9"
// }
// console.log('token ', res.request.header.token);
// console.log('Role ', res.request.header.role);

beforeAll(async () => {
    await db.seed.run();
}) 

afterAll(async () => {
    await db.destroy();
})

// describe('Auth test', () => {
//     test('calls post with correct path', async () => {
//         // await supertest(server).post('/api/login')
//         // .send({ username: 'mickey65', password: '123'}).set('res.cookie', mockToken);
//         const mockOnlyToken = {
//     'token':
//     "eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE9"
// }   
//         await supertest(server).post('/api/login').send(mockLoginData).set('res.cookie', mockOnlyToken);
//          const res = await supertest(server).get('/api/unanswered')
         
// console.log('T ', res);
//          expect(res.status).toBe(200);
         
         
         
//         })
        
   
    
        

       
//     })      // const response = await supertest(server).get('/api/unanswered')


describe('questions unanswered displayed for users and devs', () => {
    
        describe('failure tests', () => {

            test('401 GET /api/unanswered', async () => {

                        const res = await supertest(server).get('/api/unanswered');

                        expect(res.statusCode).toBe(401);
                        expect(res.type).toBe('application/json');
                        expect(res.body.message).toMatch(/invalid credentials/i);
            });

            test('401 GET /api/unanswered/:id', async () => {
                const res = await supertest(server).get('/api/unanswered/1');

                expect(res.statusCode).toBe(401);
                expect(res.type).toBe('application/json');
                expect(res.body.message).toMatch(/invalid credentials/i);
            });

        });
        // describe('Passing tests', () => {
        //     test('200 GET /api/unanswered', async () => {
        //     const response = await supertest(server).get('/api/unanswered').set(mockUserToken);
            
        //     expect(response.statusCode).toBe(200);
        //     expect(response.type).toBe('application/json');
           
        ////     })
        //// })
          
})