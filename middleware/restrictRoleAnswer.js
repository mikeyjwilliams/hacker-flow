
function restrictRoleAnswer() {
    return async (req, res, next) => {
        if(req.token && (req.token.role === 'dev' ||
         req.token.role === 'user-dev')) {
             next();
         } else {
             return res.status(403).json({ message: 'access not granted'});
         }
    }
}

module.exports = restrictRoleAnswer;