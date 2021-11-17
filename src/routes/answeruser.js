const express = require('express');
const passport = require('../config/passport');
const asyncMiddleware = require('../db/middlewares/async');
const AnswerUser = require('../db/queryBuilders/AnswerUser');
const router = express.Router();

// select all
router.get('/all', (req, res) => {
  return AnswerUser.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});

// select one
router.get('/', (req, res) => {
  const { id } = req.query;
  return AnswerUser.getById(id)
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
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { answer_id } = req.body;
    const [{ id }] = req.user;
    const result = await AnswerUser.insert({
      user_id: id,
      answer_id: answer_id,
    });
    return res.json(result);
  })
);
// update
router.put('/', (req, res) => {
  const data = req.body;
  return AnswerUser.update(data)
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

  return AnswerUser.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
