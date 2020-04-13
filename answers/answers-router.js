const express = require('express');
const Amodel = require('./answers-model');
// middle ware -----
const restrict = require('../middleware/restrict');
const answerVerify = require('../middleware/answerVerify');
const restrictRole = require('../middleware/restrictRole');
// middle ware ----

const router = express.Router();

/**
 * @route /api/question/:id/answers
 * @type POST
 * @description post a new answer to specific question parent.
 * @middleware restrict() => loggedin, restrictRole() => user-devs only, answerVerify() => checks
 * needed data
 * @errors 400, 404, 500
 */
router.post('/question/:id/answers',
restrict(),
restrictRole(),
answerVerify(),

    async (req, res, next) => {

    const { id } = req.params;
    const { title, solution, comments } = req.body;
    const newAnswer = {
        title: title,
        solution: solution,
        comments: comments || 'n/a',
        best_answer: false,
        question_id: id,
        dev_id: req.token.userId,
    };
    try {
        const answer = await Amodel.addAnswer(newAnswer);
        if(!answer) {
            return res.status(404).json({message: 'question ID does not exist'});
        } 
        res.status(201).json(answer); 
    } catch(err) {
        next(err);
    }
})


module.exports = router;