const express = require('express');
const User = require('../db/queryBuilders/User');
const router = express.Router();
const passport = require('passport');
const asyncMiddleware = require('../db/middlewares/async');

// select all
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return User.getAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.sendStatus(500).send(err);
      });
  }
);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const [user] = req.user;
    const userPoints = await User.getPoints(user.id);

    const allQuestionsPoints = await User.getAllQuestionsPoints();
    const results = {
      ...user,
      userPoints,
      allPoints: allQuestionsPoints,
    };
    return res.json(results);
  })
);

// select one
router.get('/', (req, res) => {
  const { id } = req.query;
  return User.getById(id)
    .then((data) => {
      if (data.length <= 0) {
        return res.sendStatus(404).send('not found');
      } else {
        return res.send(data);
      }
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});
// insert
router.post('/', (req, res) => {
  const data = req.body;
  return User.insert(data)
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
  return User.update(data)
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

  return User.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
