/** @format */

const express = require('express');
const bcrypt = require('bcryptjs');
const genToken = require('./genToken');
const userModel = require('../users/users-model');

const router = express.Router();

/**
 * @type POST /api/register
 * @description register a user || dev with their info included.
 * @checks all needed items or returns a 400 with specific message.
 * @returns { user data that was set }
 */
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
      role: role.toLowerCase()
    };
    const newUser = await userModel.addUser(userReg);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

/**
 * @type POST /api/login
 * @description logs user in if username and password are correct.
 * @checks username & password exist, password matches users.
 * @returns { token, userId, role, username, greeting }
 */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }
  try {
    const user = await userModel.findPassByUser({ username });

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const token = genToken(user);

    res.cookie('token', token); // token in cookie-parser for storage.
    req.userId = user.id; // userId in req to pass myself.
    req.role = user.role; // user role in req. for easier checks.
    req.username = user.username; // username in req to send around.
    res.status(200).json({
      message: `Welcome ${user.username}`,
      userId: user.id,
      username: user.username,
      role: user.role,
      token: token // cookie avail for front-end auth
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
