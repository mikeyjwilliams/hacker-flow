/** @format */

const supertest = require('supertest');
const userModel = require('../users/users-model');
const server = require('../server');
const db = require('../data/config');

beforeAll(async () => {
  await db.seed.run();
});

// afterAll(async () => {
//   await db.destroy();
// });

describe('Register a User', () => {
  describe('Register failing', () => {
    test('POST /api/register', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'miguel23',
          password: 'abc123',
          email: 'miguel@gmail.com',
          first_name: 'miguel',
          last_name: 'bravo',
          role: 'user',
        });

      expect(res.statusCode).toBe(201);
      expect(res.type).toBe('application/json');
      expect(res.body.username).toMatch(/miguel23/i);
      expect(res.body.email).toMatch(/miguel@gmail.com/i);
      expect(res.body.role).toBe('user');
    });

    test('username is not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({ username: null });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/username required/i);
    });

    test('password is not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({ username: 'mikey', password: null });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/password required/i);
    });

    test('email is not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({ username: 'mikey', password: 'abc123', email: null });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/email required/i);
    });

    test('first name not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'mikey',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: null,
        });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/first_name required/i);
    });

    test('last name is not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'mikey',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: 'mikey',
          last_name: null,
        });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/last_name required/i);
    });

    test('role is not filled in', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'mikey',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: 'mikey',
          last_name: 'bravo',
          role: null,
        });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/role is required/i);
    });

    test('username already exist', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'mikey1',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: 'mikey',
          last_name: 'bravo',
          role: 'dev',
        });

      expect(res.statusCode).toBe(409);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/username already exists/i);
    });
  });

  describe('register pass', () => {
    test('POST /api/register', async () => {
      const res = await supertest(server)
        .post('/api/register')
        .send({
          username: 'mikey',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: 'mikey',
          last_name: 'bravo',
          role: 'user',
        });

      expect(res.statusCode).toBe(201);
      expect(res.type).toBe('application/json');
      expect(res.body.username).toMatch(/mikey/i);
      expect(res.body.last_name).toMatch(/bravo/i);
      expect(res.body.role).toMatch(/user/i);
    });
  });
});
