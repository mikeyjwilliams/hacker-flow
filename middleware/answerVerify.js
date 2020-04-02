
function answerVerify() {
    return (req, res, next) => {
        const { title, solution } = req.body;

        if(!title) {
            return res.status(400).json({ message: 'title is required'});
        }
        if(!solution) {
            return res.status(400).json({ message: 'solution is required'});
        }
        

        next();
    }
}

module.exports = answerVerify;