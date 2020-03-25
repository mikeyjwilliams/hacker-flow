/** @format */

const express = require('express');
const argon2 = require('argon2');

const userModel = require('../users/users-model');

const router = express.Router();

router.post('/register', async (req, res, next) => {});

module.exports = router;
