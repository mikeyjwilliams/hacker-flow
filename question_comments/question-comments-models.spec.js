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
    const res = await QCmodel.allCommentsForUser(1);

    expect(res[0].comment).toMatch(/looking through google/i);
    expect(res[1].comment).toMatch(/the newest one/i);
    expect(res[0].username).toMatch(/mickey65/i);

    expect(res).toHaveLength(2);
  });

  test('add a comment', async () => {
    const res = await QCmodel.addComment({
      question_id: 1,
      user_id: 7,
      comment: 'you should try going to the site directly',
    });

    const response = await QCmodel.allCommentsForQuestion(1);

    expect(res.comment).toMatch(/you should try going to the site directly/i);
    expect(res.username).toMatch(/userdev/i);

    expect(response).toHaveLength(3);
  });

  test('update a comment made', async () => {
    const response = await QCmodel.addComment({
      question_id: 2,
      user_id: 7,
      comment: 'what have you tried',
    });
    const res = await QCmodel.updateComment(2, {
      question_id: 2,
      user_id: 1,
      comment: 'did you try google?',
    });

    expect(res.username).toMatch(/mickey65/i);
    expect(res.comment).toMatch(/did you try google/i);
  });

  test('delete a comment that has been made', async () => {
    const comment = await QCmodel.addComment({
      question_id: 2,
      user_id: 7,
      comment: 'useless coent',
    });
    expect(comment.question_id).toBe(5);
    expect(comment.username).toMatch(/userdev/i);

    const response = await QCmodel.allCommentsForQuestion(2);

    expect(response.length).toBe(3);

    const r = await QCmodel.deleteComment(5);

    const res = await QCmodel.allCommentsForQuestion(2);

    expect(res.length).toBe(2);
  });
});
