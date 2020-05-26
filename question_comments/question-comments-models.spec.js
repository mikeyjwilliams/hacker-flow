/** @format */

const db = require('../data/config');
const Qmodel = require('./question-comments-models');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
