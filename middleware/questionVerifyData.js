
function questionVerifyData() {
    return (req, res, next) => {
        const { title, category, question } = req.body;

        if(!title) {
            return res.status(400).json({ message: 'title is required'});
        }
        if(!category) {
            return res.status(400).json({ message: 'category is required'});
        }
        if(!question) {
            return res.status(400).json({ message: 'question is required'});
        }

        next();
    }
}
module.exports = questionVerifyData;