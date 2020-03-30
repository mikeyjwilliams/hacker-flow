/** @format */
const express = require('express');
const restrict = require('../middleware/restrict');
const QuestionModel = require('../questions/questions-model');
const router = express.Router();

router.get('/unanswered', async (req, res, next) => {
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

module.exports = router;
