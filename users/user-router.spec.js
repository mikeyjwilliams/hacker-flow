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

describe('user router fail tests', () => {
  test('username is required', async () => {
    const res = await supertest(server).post('/api/usersetup').send({
      username: null,
    });

    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toMatch(/username is required/i);
  });

  test('first name is required', async () => {
    const res = await supertest(server).post('/api/usersetup').send({
      username: 'Beth1',
      first_name: null,
    });

    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toMatch(/first name is required/i);
  });

  test('last_name is required', async () => {
    const res = await supertest(server).post('/api/usersetup').send({
      username: 'Beth1',
      first_name: 'Beth',
      last_name: null,
    });

    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toMatch(/last name is required/i);
  });

  test('username is already in use', async () => {
    const res = await supertest(server).post('/api/usersetup').send({
      username: 'Beth1',
      first_name: 'Beth',
      last_name: 'smith',
      username: 'mickey65',
    });

    expect(res.statusCode).toBe(409);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toMatch(
      /sorry, username mickey65 is taken please choose another/i
    );
  });
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
