/** @format */
const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function restrict() {
  const authError = { message: 'Invalid Credentials' };
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        return res.status(401).json(authError);
      }
      jwt.verify(token, secret.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        } else {
          req.token = decoded;
          console.log('person ', req.token);
          next();
        }
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = restrict;
