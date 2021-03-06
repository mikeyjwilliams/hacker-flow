/** @format */

const supertest = require('supertest');

const server = require('../server');
const db = require('../data/config');

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Register a User', () => {
  describe('Register failing', () => {
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
      const res = await supertest(server).post('/api/register').send({
        username: 'mikey',
        password: 'abc123',
        email: 'mikey@gmail.com',
        first_name: null
      });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/first_name required/i);
    });

    test('last name is not filled in', async () => {
      const res = await supertest(server).post('/api/register').send({
        username: 'mikey',
        password: 'abc123',
        email: 'mikey@gmail.com',
        first_name: 'mikey',
        last_name: null
      });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/last_name required/i);
    });

    test('role is not filled in', async () => {
      const res = await supertest(server).post('/api/register').send({
        username: 'mikey',
        password: 'abc123',
        email: 'mikey@gmail.com',
        first_name: 'mikey',
        last_name: 'bravo',
        role: null
      });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/role is required/i);
    });

    test('username already exist', async () => {
      const res = await supertest(server).post('/api/register').send({
        username: 'mikey1',
        password: 'abc123',
        email: 'mikey@gmail.com',
        first_name: 'mikey',
        last_name: 'bravo',
        role: 'dev'
      });

      expect(res.statusCode).toBe(409);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/username already exists/i);
    });
  });

  describe('register pass', () => {
    describe('user Pass FUTURE CASE -> USER', () => {
      test('POST /api/register', async () => {
        const res = await supertest(server).post('/api/register').send({
          username: 'mikey',
          password: 'abc123',
          email: 'mikey@gmail.com',
          first_name: 'mikey',
          last_name: 'bravo',
          role: 'user'
        });

        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toMatch(/mikey/i);
        expect(res.body.last_name).toMatch(/bravo/i);
        expect(res.body.role).toMatch(/user/i);
      });
    });
    describe('dev passes FUTURE CASE -> DEV', () => {
      test('POST /api/register', async () => {
        const res = await supertest(server).post('/api/register').send({
          username: 'miguel23',
          password: 'abc123',
          email: 'miguel@gmail.com',
          first_name: 'miguel',
          last_name: 'bravo',
          role: 'DEV'
        });

        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toMatch(/miguel23/i);
        expect(res.body.email).toMatch(/miguel@gmail.com/i);
        expect(res.body.role).toBe('dev');
      });
    });

    describe('user-dev passes', () => {
      test('POST /api/register', async () => {
        const res = await supertest(server).post('/api/register').send({
          username: 'userDevMan',
          password: 'abc123',
          email: 'userdev@gmail.com',
          first_name: 'devuserman',
          last_name: 'prouser',
          role: 'user-dev'
        });

        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');
        expect(res.body.username).toMatch(/userDevMan/i);
        expect(res.body.role).toMatch(/user-dev/i);
      });
    });
  });
});

describe('Log in user fails', () => {
  describe('login missing username', () => {
    test('POST /api/login', async () => {
      const res = await supertest(server)
        .post('/api/login')
        .send({ username: null });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/username is required/i);
    });
  });

  describe('login missing password', () => {
    test('POST /api/login', async () => {
      const res = await supertest(server)
        .post('/api/login')
        .send({ username: 'mikey1', password: null });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/password is required/i);
    });
  });

  describe('user is missing', () => {
    test('POST /api/login', async () => {
      const res = await supertest(server)
        .post('/api/login')
        .send({ username: 'johnny', password: 'john' });

      expect(res.statusCode).toBe(400);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/user not found/i);
    });
  });

  describe('login fail due to password', () => {
    test('POST /api/login', async () => {
      const res = await supertest(server)
        .post('/api/login')
        .send({ username: 'menzinger54', password: '34' });

      expect(res.statusCode).toBe(401);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});

describe('Login person Passes', () => {
  // describe('login pass role user FUTURE CASE', () => {
  //   test('POST /api/login', async () => {
  //     const res = await supertest(server)
  //       .post('/api/login')
  //       .send({ username: '', password: '' });

  //     expect(res.statusCode).toBe(200);
  //     expect(res.type).toBe('application/json');
  //     expect(res.body.role).toMatch('user');
  //   });
  // });

  // describe('login pass role dev FUTURE CASE', () => {
  //   test('POST /api/login', async () => {
  //     const res = await supertest(server)
  //       .post('/api/login')
  //       .send({ username: '', password: '' });

  //     expect(res.statusCode).toBe(200);
  //     expect(res.type).toBe('application/json');
  //     expect(res.body.role).toMatch('dev');
  //   });
  // });

  describe('login pass role user-dev', () => {
    test('POST /api/login', async () => {
      const res = await supertest(server)
        .post('/api/login')
        .send({ username: 'userdev', password: 'user123' });

      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body.role).toMatch(/user-dev/i);
    });
  });
});
