/** @format */

const db = require('../data/config');
const QCmodel = require('./question-comments-models');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('question comments models testing', () => {
  test('comment by id', async () => {
    const res = await QCmodel.commentById(1);

    expect(res.comment).toMatch(/what have you tried so far/i);
    expect(res.username).toMatch(/bri34fal/i);
  });

  test('all comments from a user', async () => {
    const res = await QCmodel.allComments(1);

    expect(res[0].comment).toMatch(/looking through google/i);
    expect(res[1].comment).toMatch(/the newest one/i);
    expect(res[0].username).toMatch(/mickey65/i);

    expect(res).toHaveLength(2);
  });
});
