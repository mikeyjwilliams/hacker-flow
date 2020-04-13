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
    console.log('L ', unanswered.length);
    if (unanswered.length <= 0) {
      return res.status(400).json({
        message: 'sorry no questions to ask.'
      });
    }
    console.log('L ', unanswered.length);
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

/**
 * @type GET /api/answered
 * @description get all answered questions only / no answers
 * @middleware restrict() => logged, restrictRole() => user-dev only
 * @errors 404, 500
 */
router.get('/answered', restrict(), restrictRole(), async (req, res, next) => {
  try {
    const answeredQuestions = await QuestionModel.answeredQuestions();

    if (answeredQuestions.length <= 0) {
      return res
        .status(404)
        .json({ message: 'there are no answered questions yet' });
    }
    res.status(200).json(answeredQuestions);
  } catch (err) {
    next(err);
  }
});

/**
 * @type GET /api/answered/:id
 * @description a specific question must be answered.
 * @middleware restrict() => logged, restrictRole => user-dev only
 * @errors 401, 404, 500
 */
router.get('/answered/:id', async (req, res, next) => {
  const question_id = req.params.id;
  try {
    const answeredQuestion = await QuestionModel.answeredById(question_id);

    if (!answeredQuestion) {
      return res.status(404).json({ message: 'question ID does not exist' });
    }
    res.status(200).json(answeredQuestion);
  } catch (err) {
    next(err);
  }
});

/**
 * @type POST /api/new-question
 * @description user creates a new unsolved question to the board.
 * @middleware restrict() => logged in, restrictRole() => user-dev only
 * @errors 401, 400, 403, 500
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

/**
 * @type GET /api/question/:id/answers-only
 * @description retrieves only the answers back for question stated in param
 * @middleware restrict() -> logged-in, restrictRole() -> user-dev access only
 * @errors 404, 500
 */
router.get(
  '/question/:id/answers-only',
  restrict(),
  restrictRole(),
  async (req, res, next) => {
    const question_id = req.params.id;
    try {
      const questionAnswers = await QuestionModel.getAllQuestionAnswers(
        question_id
      );
      if (questionAnswers.length <= 0) {
        return res
          .status(404)
          .json({ message: 'Sorry there are no answers for this question.' });
      }

      res.status(200).json(questionAnswers);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @type GET /api/all-questions
 * @description gets all questions answered or not back
 * @middleware restrict() => logged in, restrictRole => user-dev only.
 * @errors 404, 500
 */
router.get(
  '/all-questions',
  restrict(),
  restrictRole(),
  async (req, res, next) => {
    try {
      const allQuestions = await QuestionModel.getAllQuestions();
      if (allQuestions.length <= 0) {
        return res
          .status(404)
          .json({ message: 'sorry no questions to display at this time' });
      }
      res.status(200).json(allQuestions);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @type GET /api/question/:id/answers
 * @description get answers from specific question id
 * @middleware restrict -> logged in, restrictRole -> user-dev only
 * @errors 404, 500
 */
router.get(
  '/question/:id/answers',
  restrict(),
  restrictRole(),
  async (req, res, next) => {
    const question_id = req.params.id;
    try {
      const questionAnswers = await QuestionModel.getQuestionAndAnswers(
        question_id
      );
      if (questionAnswers.length <= 0) {
        return res
          .status(404)
          .json({ message: 'sorry this question has no answers' });
      }
      res.status(200).json(questionAnswers);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/unanswered/:id',
  restrict(),
  restrictRole(),
  questionVerify(),
  async (req, res, next) => {
    const { id } = req.params;
    const { title, category, question, attempt_tried, comments } = req.body;

    const update = {
      title: title,
      category: category,
      question: question,
      attempt_tried: attempt_tried || 'n/a',
      comments: comments || 'n/a',
      solved: false,
      user_id: req.token.user_id
    };

    try {
      const updated = await QuestionModel.updateQuestion(id, update);

      if (!updated) {
        return res
          .status(404)
          .json({ message: 'sorry question does not exist' });
      }
      res.status(200).json(updated);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

module.exports = router;
