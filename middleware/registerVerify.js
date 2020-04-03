function registerVerify() {
    return (req, res, next) => {
        const { username, password, email, first_name, last_name, role } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'username required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'password required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email required' });
        }
        if (!first_name) {
            return res.status(400).json({ message: 'first_name required' });
        }
        if (!last_name) {
            return res.status(400).json({ message: 'last_name required' });
        }
        if (!role) {
            return res.status(400).json({ message: 'role is required' });
        }
    next();
    }
}
module.exports = registerVerify;