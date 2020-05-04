/** @format */

// /** @format */

const authModel = require('../auth/auth-model');
const userModel = require('./users-model');
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
      const res = await userModel.getUsers();

      expect(res).toHaveLength(7);
    });
  });

  describe('find a user By Filter', () => {
    test('findBy first_name Pass', async () => {
      const res = await userModel.findBy({ first_name: 'mickey' }).first();

      expect(res.username).toBe('mickey65');
      expect(res.last_name).toBe('mouse');
    });

    test('findBy last_name Pass', async () => {
      const res = await userModel.findBy({ last_name: 'fallon' }).first();

      expect(res.username).toMatch(/bri34fal/i);
      expect(res.first_name).toMatch(/brian/i);
    });
  });

  describe('find user by id', () => {
    test('findById(1) mickey', async () => {
      const res = await userModel.findById(1);

      expect(res.id).toBe(1);
      expect(res.username).toBe('mickey65');
      expect(res.last_name).toBe('mouse');
    });

    test('findById(2) brian', async () => {
      const res = await userModel.findById(2);

      expect(res.id).toBe(2);
      expect(res.username).toBe('bri34fal');
      expect(res.first_name).toBe('brian');
    });
  });

  describe('Add User', () => {
    test('add a user to user table', async () => {
      const response = await authModel.addUser({
        email: 'randy@gmail.com',
        password: 'run123',
      });
      const res = await userModel.addUser({
        username: 'randy1',
        first_name: 'Randy',
        last_name: 'Marsh',
        sign_in_id: response.id,
      });
      expect(res.username).toMatch(/randy1/i);
      expect(res.first_name).toMatch(/randy/i);
      expect(res.last_name).toMatch(/marsh/i);
    });
  });

  //   //!! Foreign key constraint cannot do this right now.
  //   //   describe('remove a user', () => {
  //   //     test('delete user 5', async () => {
  //   //       await User.deleteUser(5);
  //   //       const res = await User.getUsers();
  //   //       expect(res).toHaveLength(5);
  //   // //    });
  //   ////   });
});
