/** @format */

const db = require('../data/config');
const QuestModel = require('./questions-model');

beforeEach(async () => {
	await db.seed.run();
});

afterAll(async () => {
	await db.destroy();
});

describe('questions models', () => {
	describe('unanswered questions', () => {
		test('get unanswered questions', async () => {
			const res = await QuestModel.unansweredQuestions();

			expect(res).toHaveLength(6);
		});
	});

	describe('answered questions', () => {
		test('get answered questions', async () => {
			const res = await QuestModel.answeredQuestions();

			expect(res).toHaveLength(3);
		});
	});

	describe('single question models', () => {
		test('unansweredById', async () => {
			const res = await QuestModel.unansweredById(4);

			expect.objectContaining({
				title: expect.any(String),
				category: expect.any(String)
			});

			expect(res.username).toMatch(/trippygoof#2/i);
		});
	});

	describe('answeredById', () => {
		test('answered question by id given', async () => {
			const res = await QuestModel.answeredById(1);

			expect(res.category).toBe('node.js');
			expect(res.comments).toBe('n/a');
		});
	});

	describe('question by ID', () => {
		test('questionById', async () => {
			const res = await QuestModel.questionById(1);

			expect(res.category).toMatch(/node.js/i);
			expect(res.comments).toBe('n/a');
			expect(res.username).toMatch(/mickey65/i);
		});
	});

	describe('add a question', () => {
		test('insert question', async () => {
			const res = await QuestModel.addQuestion({
				title: 'blank',
				category: 'history',
				question: 'who created node.js',
				attempt_tried: 'n/a',
				comments: 'n/a',
				solved: false,
				user_id: 2
			});

			expect(res.title).toMatch(/blank/i);
			expect(res.category).toMatch(/history/i);
			expect(res.username).toMatch('bri34fal');
		});
	});

	describe('getAllQuestionAnswers', () => {
		test('get all answers for a question', async () => {
			const res = await QuestModel.getAllQuestions(1);

			expect(res.length).toBeGreaterThanOrEqual(1);
		});

		test('0 result no answers for question', async () => {
			const res = await QuestModel.getAllSpecificQuestionAnswers(4);

			expect(res.length).toBeFalsy();
		});

		test('exact num of answers for a question', async () => {
			const res = await QuestModel.getAllSpecificQuestionAnswers(3);

			expect(res).toHaveLength(2);
		});
	});

	describe('getAllQuestions', () => {
		test('get all questions answered and unanswered', async () => {
			const res = await QuestModel.getAllQuestions();

			expect(res).toHaveLength(9);
		});
	});

	describe('allQuestionsByUser', () => {
		test('get question of a user by user id', async () => {
			const res = await QuestModel.allQuestionsByUser(2);

			expect(res.length).toH; ///aveLength(2);
			expect(res.length).toBeGreaterThanOrEqual(1);
		});

		describe('getQuestionAndAnswers', () => {
			test('get question by id and all answers along with it', async () => {
				const res = await QuestModel.getQuestionAndAnswers(3);

				expect(res).toHaveLength(2);
			});
		});

		describe('updateQuestion model', () => {
			test('update a question that was asked', async () => {
				const res = await QuestModel.updateQuestion(8, {
					title: 'node creator',
					category: 'node.js',
					question: 'who created node.js?',
					attempt_tried: 'I looked through the docs...',
					comments: 'I was wondering who created node.js for a report',
					solved: false,
					user_id: 2
				});

				expect(res.attempt_tried).toMatch(/i looked through the docs/i);
				expect(res.category).toBe('node.js');
				expect(res.title).toBe('node creator');
			});
		});
	});
});
