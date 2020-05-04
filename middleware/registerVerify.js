const authModel = require('../auth/auth-model');

function registerVerify() {
    return (req, res, next) => {
        const emailAddressToLong = 165;
        const emailAddressToShort = 3;
        const passwordToShort = 3;
        const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    } else if (email.length > emailAddressToLong) {
      return res.status(400).json({
        message: `email is longer than ${emailAddressToLong} characters... sorry too long`,
      });
    } else if (email.length < emailAddressToShort) {
      return res.status(400).json({ message: 'email is too short' });
    } else if (!email.includes('@')) {
      return res
        .status(400)
        .json({ message: 'an email address requires an @ sign' });
    }
    if (!password) {
      return res.status(400).json({ message: 'password is required' });
    }
    if (password.length < passwordToShort) {
      return res.status(400).json({
        message: `password too short ${passwordToShort} characters or longer`,
      });
    }
    const emailCheck = await authModel.findBy({ email }).first();

    if (emailCheck) {
      return res
        .status(409)
        .json({ message: `email ${emailCheck.email} is not available.` });
    }
    next();
    }
}
module.exports = registerVerify;