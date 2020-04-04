/** @format */
const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function restrict() {
  const authError = { message: 'Invalid Credentials' };
  return async (req, res, next) => {
    const { token } = req.cookies;
    const tokens = req.header.Authorization;

    if (tokens) {
      /**
       * verification through headers
       */
      try {
        if (!tokens) {
          return res.status(401).json(authError);
        }
        jwt.verify(tokens, secret.jwtSecret, (err, decoded) => {
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
    }
    /**
     * verification through req.cookies
     */ try {
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
