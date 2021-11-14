const express = require('express');
const passport = require('passport');
const asyncMiddleware = require('../db/middlewares/async');
const Question = require('../db/queryBuilders/Question');
const Category = require('../db/queryBuilders/Category');
const QuestionType = require('../db/queryBuilders/QuestionType');
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
  '/admin/all',
  //passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    /// fetch all questions
    const questions = await Question.getAll();
    // get ids of questions [1,2,4,56,78]
    const questionsIds = questions.map((c) => c.id);
    // get categories of questions
    // [{id, name, question_id}]
    const categoriesByQuestion = await QuestionCategory.getByQuestion(
      questionsIds
    );

    //
    const resultQuestions = questions.map((question) => {
      const [category] = categoriesByQuestion.filter(
        (c) => c.question_id === question.id
      );

      //{id, } => after spread id:2, name:2
      return {
        ...question,
        category_id: category?.id,
      };
    });

    const categories = await Category.getAll();
    const questionTypes = await QuestionType.getAll();
    res.send({
      questions: resultQuestions,
      categories,
      questionTypes,
    });
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
router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const {
      question,
      question_type_id,
      point,
      is_active = 1,
      category_id,
    } = req.body;
    const [inserted] = await Question.insert({
      question,
      question_type_id,
      point,
      is_active,
    });

    await QuestionCategory.insert({
      question_id: inserted,
      category_id: category_id,
    });

    return res.send(true);
  })
);

// update
router.put(
  '/',
  asyncMiddleware(async (req, res) => {
    const {
      id,
      question,
      question_type_id,
      point,
      is_active = 1,
      category_id,
    } = req.body;
    // update question row
    const updatedQuestion = await Question.update({
      id,
      question,
      question_type_id,
      point,
      is_active,
    });

    await QuestionCategory.deleteByQuestion(id);

    await QuestionCategory.insert({
      question_id: id,
      category_id: category_id,
    });

    return res.send(true);
    // update relationship between category and question.
  })
);

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
