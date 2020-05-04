/** @format */

const express = require('express');
const bcrypt = require('bcryptjs');
const genToken = require('./genToken');
const userModel = require('../users/users-model');
const authModel = require('./auth-model');
// middle ware ---
const authVerify = require('../middleware/authVerify');
const registerVerify = require('../middleware/registerVerify');
// middleware end ---

const router = express.Router();

/**
 * @type POST /api/register
 * @description register email and password.
 * @checks all needed items or returns a 400 with specific message.
 * @middleware registerVerify()
 * @returns { user data that was set }
 */
router.post('/register', registerVerify(), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = {
      email: email,
      password: password,
    };
    const user = await authModel.addUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// /**
//  * @type POST /api/login
//  * @description logs user in if username and password are correct.
//  * @checks username & password exist, password matches users.
//  * @middleware authVerify()
//  * @returns { token, userId, role, username, greeting }
//  */
// router.post('/login', authVerify(), async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const user = await userModel.findPassByUser({ username });

//     if (!user) {
//       return res.status(400).json({ message: 'user not found' });
//     }

//     const passwordValid = await bcrypt.compare(password, user.password);

//     if (!passwordValid) {
//       return res.status(401).json({ message: 'invalid credentials' });
//     }
//     const token = genToken(user); // generate token for accessing other site sections. and pass role from db to api.
//     console.log('!! before production add expiresIn in genToken');
//     res.cookie('token', token); // token in cookie-parser for storage.

//     res.status(200).json({
//       message: `Welcome ${user.username}`,
//       userId: user.id,
//       username: user.username,
//       role: user.role,
//       token: token // cookie avail for front-end auth
//     });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
