/** @format */
const express = require('express');
const restrict = require('../middleware/restrict');
const QuestionModel = require('../questions/questions-model');
const router = express.Router();

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
