/**
 * ! requires restrict.js middleware
 * ! in front of this middlware to work correctly
 * ! and to be secure.
 *
 * @format
 */

const userModel = require('../users/users-model');

function userDataVerify() {
  return async (req, res, next) => {
    try {
      const user_id = req.token.userId;
      const userData = await userModel.getUser(user_id);

      if (userData.user_id === undefined) {
        res.redirect('/api/usersetup');
      }

      req.userId = userData.user_id;
      req.username = userData.username;
      req.firstName = userData.first_name;
      req.lastName = userData.last_name;
      req.mainId = userData.main_id;

      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = userDataVerify;
