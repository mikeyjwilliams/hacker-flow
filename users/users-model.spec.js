/** @format */

const User = require('./users-model');
const db = require('../data/config');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('User Model Methods', () => {
  describe('getUsers in users table', () => {
    test('get all users', async () => {
      const res = await User.getUsers();
      expect(res).toHaveLength(7);
    });
  });

  describe('find a user By Filter', () => {
    test('findBy first_name Pass', async () => {
      const res = await User.findBy({ first_name: 'mickey' }).first();

      expect(res.username).toBe('mickey65');
      expect(res.last_name).toBe('mouse');
      expect(res.role).toBe('user');
    });

    test('findBy last_name Pass', async () => {
      const res = await User.findBy({ last_name: 'fallon' }).first();
      expect(res.username).toMatch(/bri34fal/i);
      expect(res.email).toMatch(/brianfallon/i);
      expect(res.role).toMatch(/user/i);
    });
  });

  describe('find user by id', () => {
    test('findById(1) mickey', async () => {
      const res = await User.findById(1);
      expect(res.username).toBe('mickey65');
      expect(res.email).toBe('mickey@gmail.com');
      expect(res.last_name).toBe('mouse');
      expect(res.role).toBe('user');
    });

    test('findById(2) brian', async () => {
      const res = await User.findById(2);
      expect(res.username).toBe('bri34fal');
      expect(res.email).toBe('brianfallon@hotmail.com');
      expect(res.first_name).toBe('brian');
    });
  });

  describe('findPass by user name ', () => {
    test('findPassByUser name test 1', async () => {
      const res = await User.findPassByUser({ username: 'trippygoof#2' });
      expect(res.password).toBeTruthy();
    });

    test('findPassByUser name test 2', async () => {
      const res = await User.findPassByUser({ username: 'menzinger54' });
      expect(res.password).toBeTruthy();
    });
  });

  describe('add a user to users table', () => {
    test('addUser test 1', async () => {
      const res = await User.addUser({
        username: 'cartman64',
        password: 'abc123',
        email: 'cartman1@gmail.com',
        first_name: 'cartman',
        last_name: 'marsh',
        role: 'user'
      });
      expect(res.username).toBe('cartman64');
      expect(res.email).toMatch(/cartman1@gmail.com/i);
      expect(res.last_name).toMatch(/marsh/i);
      expect(res.role).toBe('user');
    });

    test('addUser 2nd test', async () => {
      const res = await User.addUser({
        username: 'randy1',
        password: 'martian1',
        email: 'randy@gmail.com',
        first_name: 'Randy',
        last_name: 'Marsh',
        role: 'dev'
      });
      expect(res.username).toMatch(/randy1/i);
      expect(res.first_name).toMatch(/randy/i);
      expect(res.last_name).toMatch(/marsh/i);
      expect(res.role).toMatch(/dev/i);
    });
  });

  //!! Foreign key constraint cannot do this right now.
  //   describe('remove a user', () => {
  //     test('delete user 5', async () => {
  //       await User.deleteUser(5);
  //       const res = await User.getUsers();
  //       expect(res).toHaveLength(5);
  //     });
  //   });
});
