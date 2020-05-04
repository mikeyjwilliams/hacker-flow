/** @format */

const db = require('../data/config');
const server = require('../server');
const supertest = require('supertest');

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('user router', () => {
  test('user adds users data after registering', async () => {
    const response = await supertest(server).post('/api/register').send({
      email: 'jerry@hotmail.com',
      password: 'jerrytv',
    });
    const res = await supertest(server).post('/api/usersetup').send({
      username: 'jerry123',
      first_name: 'jerry',
      last_name: 'smith',
      sign_in_id: response.id,
    });

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.username).toBe('jerry123');
    expect(res.body.first_name).toBe('jerry');
  });
});
