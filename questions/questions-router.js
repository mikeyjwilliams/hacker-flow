/** @format */
const express = require('express');
const QuestionModel = require('../questions/questions-model');

// middle ware used --------------
const restrict = require('../middleware/restrict');
const questionVerify = require('../middleware/questionVerifyData');
const restrictRole = require('../middleware/restrictRole');
// end middle ware ---------------
const router = express.Router();

/**
 * @type GET /api/unanswered
 * @description get all unanswered question data back w/ username who asked.
 * @middleware restrict() => must be logged in to access.
 * @errors 0 unanswered questions return a 400 'no questions to ask'
 */
router.get('/unanswered', restrict(), async (req, res, next) => {
  try {
    const unanswered = await QuestionModel.unansweredQuestions();
    if (unanswered.length <= 0) {
      return res.status(400).json({
        message: 'sorry no questions to ask.'
      });
    }
    res.status(200).json(unanswered);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/**
 * @type Get /api/unanswered/:id
 * @description get a specific unanswered question back
 * @middleware restrict() => must be logged in to access.
 * @errors none existent question id will return a 404
 */
router.get('/unanswered/:id', restrict(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const unanswered = await QuestionModel.unansweredById(id);
    if (!unanswered) {
      return res
        .status(404)
        .json({ message: 'question with that ID does not exist' });
    }
    res.status(200).json(unanswered);
  } catch (err) {
    next(err);
  }
});

/**
 * @type POST /api/new-question
 * @description user creates a new unsolved question to the board.
 * @middleware restrict() => logged in, restrictRole() => user-dev only
 * @errors 401, 400, 403
 */
router.post(
  '/new-question',
  restrict(),
  restrictRole(),
  questionVerify(),
  async (req, res, next) => {
    const { title, category, question, attempt_tried, comments } = req.body;
    try {
      const newQuestion = {
        title: title,
        category: category,
        question: question,
        attempt_tried: attempt_tried || 'n/a',
        comments: comments || 'n/a',
        solved: false,
        user_id: req.token.userId
      };
      const questionAdd = await QuestionModel.addQuestion(newQuestion);
      res.status(201).json(questionAdd);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
