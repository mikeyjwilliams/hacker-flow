/** @format */

const db = require('../data/config');
const authModel = require('./auth-model');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Auth-model', () => {
  it.only('find by passing a user name', async () => {
    const res = await authModel.findByPass({ email: 'mickey@gmail.com' });

    expect(res.email).toBe('mickey@gmail.com');
    expect(res.password).toBeTruthy();
  });
});
