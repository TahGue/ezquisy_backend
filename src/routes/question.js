const express = require('express');
const passport = require('passport');
const asyncMiddleware = require('../db/middlewares/async');
const Question = require('../db/queryBuilders/Question');
const router = express.Router();
const QuestionCategory = require('../db/queryBuilders/QuestionCategory');
const Answer = require('../db/queryBuilders/Answer');
// select all
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const questions = await Question.getAll();
    res.send(questions);
  })
);
router.get(
  '/category',
  //  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    // fetch category questions
    const questions = await QuestionCategory.getByCategory(id);
    // make array of questions ids [1,2,3,4]
    const questionsIds = questions.map((qu) => qu.id);
    // fetch answers by questions ids
    const answers = await Answer.getByQuestions(questionsIds);
    // bind answers witth queestion

    const results = questions.map((question) => {
      question.answers = answers.filter(
        (answer) => answer.question_id === question.id
      );
      return question;
    });
    res.send(results);
  })
);
// select one
router.get('/', (req, res) => {
  const { id } = req.query;
  const questions = await;
  return Question.getById(id)
    .then((data) => {
      if (data.length <= 0) {
        res.sendStatus(404).send('not found');
      }
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});
// insert
router.post('/', (req, res) => {
  const data = req.body;
  return Question.insert(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});
// update
router.put('/', (req, res) => {
  const data = req.body;
  return Question.update(data)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// delete
router.delete('/', (req, res) => {
  const id = req.query.id;

  return Question.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
