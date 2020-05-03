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
	test('find by passing a user name', async () => {
		const res = await authModel.findByPass({ email: 'mickey@gmail.com' });

		expect(res.email).toBe('mickey@gmail.com');
		expect(res.password).toBeTruthy();
	});

	test('get user by their id', async () => {
		const res = await authModel.findById(2).first();

		expect(res.email).toBe('brianfallon@hotmail.com');
		expect(res.id).toBe(2);
	});

	test('add a new user', async () => {
		const res = await authModel.addUser({
			email: 'miguel@gmail.com',
			password: 'abc123'
		});

		expect(res.id).toBe(8);
		expect(res.email).toBe('miguel@gmail.com');
	});
});
