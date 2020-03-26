/** @format */

const express = require('express');
const argon2 = require('argon2');

const userModel = require('../users/users-model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
	const { username, password, email, first_name, last_name, role } = req.body;
	if (!username) {
		return res.status(400).json({ message: 'username required' });
	}
	if (!password) {
		return res.status(400).json({ message: 'password required' });
	}
	if (!email) {
		return res.status(400).json({ message: 'email required' });
	}
	if (!first_name) {
		return res.status(400).json({ message: 'first_name required' });
	}
	if (!last_name) {
		return res.status(400).json({ message: 'last_name required' });
	}
	if (!role) {
		return res.status(400).json({ message: 'role is required' });
	}
	try {
		const user = await userModel.findBy({ username }).first();
		if (user) {
			res.status(409).json({ message: 'username already exists' });
		}

		const userReg = {
			username: username,
			password: password,
			email: email,
			first_name: first_name,
			last_name: last_name,
			role: role
		};
		const newUser = await userModel.addUser(userReg);
		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
