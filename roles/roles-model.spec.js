/** @format */

const db = require('../data/config');
const roleModel = require('./roles-model');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('roles models', () => {
  test('add a user role where user_id = ?', async () => {
    const res = await roleModel.addRole(1);

    expect(res.role).toBe('user-dev');
    expect(res.user_id).toBe(1);
    expect(res.id).toBe(8);
  });
});
