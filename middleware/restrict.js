/** @format */
const jwt = require('jsonwebtoken');
const secret = require('../Secret/secret');

function restrict() {
  const authError = { message: 'Invalid Credentials' };
  return async (req, res, next) => {
    const { token } = req.cookies;
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
