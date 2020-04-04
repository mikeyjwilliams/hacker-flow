const supertest = require('supertest');

const server = require('../server');
const db = require('../data/config');
// testing below. -----
const genToken = require('../auth/genToken');
const bcrypt = require('bcryptjs');
const authVerify = require('../middleware/authVerify');



// console.log('token ', res.request.header.token);
// console.log('Role ', res.request.header.role);
beforeAll(async () => {
    await db.seed.run();

})

const mockRequest = (sessionData) => {
    return {
        token: { data: sessionData }
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};



afterAll(async () => {
    await db.destroy();
    //userCookie.mockReset();
})


// describe('Auth test', () => {
//     test('calls post with correct path', async () => {

//          const response = await supertest(server)
//          .get('/api/unanswered')
//          .set('Authorization', userCookie());

//          expect(response.statusCode).toBe(200)

//         })
//     })      // const response = await supertest(server).get('/api/unanswered')


describe('questions unanswered displayed for users and devs', () => {

        describe('failure tests', () => {

            test('401 GET /api/unanswered', async () => {

                        const res = await supertest(server).get('/api/unanswered')

                        expect(res.statusCode).toBe(401);
                        expect(res.type).toBe('application/json');
                        expect(res.body.message).toMatch(/invalid credentials/i);
            })

            test('401 GET /api/unanswered/:id', async () => {
                const res = await supertest(server).get('/api/unanswered/1')

                expect(res.statusCode).toBe(401);
                expect(res.type).toBe('application/json');
                expect(res.body.message).toMatch(/invalid credentials/i);
            });

        });

        // describe('Passing tests', () => {
        //     test('200 GET /api/unanswered', async () => {
        //     const response = await supertest(server).get('/api/unanswered').set('res.cookie', 'token');

        //     expect(response.statusCode).toBe(200);
        //     expect(response.type).toBe('application/json');

        //     })
        // })

})