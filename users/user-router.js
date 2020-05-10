/** @format */

const express = require('express');
const userModel = require('./users-model');

const router = express.Router();

router.post('/usersetup', async (req, res, next) => {
	const { username, first_name, last_name } = req.body;
	if (!username) {
		return res.status(400).json({ message: 'username is required' });
	}
	if (!first_name) {
		return res.status(400).json({ message: 'first name is required' });
	}
	if (!last_name) {
		return res.status(400).json({ message: 'last name is required' });
	}
	try {
		const userCheck = await userModel.findBy({ username }).first();

		if (userCheck) {
			return res.status(409).json({
				message: `sorry, username ${userCheck.username} is taken please choose another.`
			});
		}
		const userData = {
			username: username,
			first_name: first_name,
			last_name: last_name,
			sign_in_id: req.userId
		};
		const user = await userModel.addUser(userData);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
