/** @format */

const User = require('./users-model');
const db = require('../data/config');

beforeEach(async () => {
  await db.seed.run();
});

describe('User Model Methods', () => {
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
});
