function passportVerify {
    return async (req, res, next) => {
       const { email, password} = req.body;
       
       if(!email) {
           return res.status(400).json({ message: 'email requirded for sign up'});
       }
       if(!password) {
           return res.status(400).json({ message: 'password required for sign up'});
       }
       next();
    }
}

module.exports = passportVerify;