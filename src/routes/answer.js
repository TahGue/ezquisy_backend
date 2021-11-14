const express = require('express');
const Answer = require('../db/queryBuilders/Answer');
const router = express.Router();
const passport = require('passport');
const asyncMiddleware = require('../db/middlewares/async');
// select all
router.get('/all', (req, res) => {
  return Answer.getAll()
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
  return Answer.getById(id)
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

// select question answers
router.get(
  '/question',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    const answrs = await Answer.getByQuestions([id]);

    res.send(answrs);
  })
);

// insert
router.post('/', (req, res) => {
  const data = req.body;
  return Answer.insert(data)
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
  return Answer.update(data)
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

  return Answer.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
