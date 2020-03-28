/** @format */
const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function restrict() {
  const authError = { message: 'Invalid Credentials' };
  return async (req, res, next) => {
    try {
      const { token } = req.cookie;

      if (!token) {
        res.status(401).json(authError);
      }
      jwt.verify(token, secret.jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json(authError);
        } else {
          req.token = decoded;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
