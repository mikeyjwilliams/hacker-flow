/** @format */
const express = require('express');
const restrict = require('../middleware/restrict');
const QuestionModel = require('../questions/questions-model');
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

module.exports = router;
