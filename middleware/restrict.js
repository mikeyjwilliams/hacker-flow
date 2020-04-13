/** @format */
const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function restrict() {
  const authError = { message: 'Invalid Credentials' };
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;
      /**
       * verification through req.cookies
       */
      if (!token) {
        return res.status(401).json(authError);
      }
      jwt.verify(token, secret.jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        } else {
          req.token = decoded;
          console.log('D ', req.token);
          console.log(
            'add expiresIn in genToken => console.log from restrict.js'
          );
          next();
        }
      });
    } catch (err) {
      console.log('logged out');
      console.log(err);

      next(err);
    }
  };
}

module.exports = restrict;
