const supertest = require('supertest');
const server = require('../server');
const genToken = require('../auth/genToken');
const cookie = require('cookie-parser');
const db = require('../data/config');

const mockLoginData = {
  username: "mickey65",
  password: "123"
};

const mockResponse = {
  success: true,
  token:
    "eyJhbGciOiJIUzI.eyJpZCI6IjVjN.1Tn8FLJEGGE8"
};

jest.mock('../auth/genToken', () => jest.fn());

jest.mock('cookie');

jest.mock('../auth/auth-router', () => ({
    post: jest.fn(() => Promise.resolve(mockResponse))
}));

beforeAll(async () => {
    await db.seed.run();
}) 

describe('Auth test', () => {
    test('calls post with correct path', async () => {
         const res = await supertest(server).post('/api/login').send(mockLoginData);
         
         expect(res).toHaveBeenCallTimes(1);
        })
        
   
    
        

       
    })      // const response = await supertest(server).get('/api/unanswered')


describe('questions unanswered displayed for users and devs', () => {
    describe('w/ restrict M.W both roles can see unanswered questions', () => {
        describe('failure tests', () => {

            test('un-auth 401 GET /api/unanswered', async () => {
                        const res = await supertest(server).get('/api/unanswered');

                        expect(res.statusCode).toBe(401);
                        expect(res.type).toBe('application/json');
                        expect(res.body.message).toMatch(/bad credentials/i);
                    })

        })
        describe('Passing tests', () => {
            test('200 GET /api/unanswered', async () => {
            const res = await supertest(server).post('/api/login')
            .send({ username: 'mickey65', password: '123'});
            const response = await supertest(server).get('/api/unanswered')
            
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
           
            })
        })
          
    })
})