
function restrictRoleQuestion(user) {
    return async (req, res, next) => {
        if(req.token && req.token.role === 'user') {
            next();
        } else {
            return res.status(403).json({ message: 'access not granted'})
        }
    }
}
module.exports = restrictRoleQuestion;