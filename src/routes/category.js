const express = require('express');
const passport = require('../config/passport');
const asyncMiddleware = require('../db/middlewares/async');
const Category = require('../db/queryBuilders/Category');
const router = express.Router();

// select all
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  asyncMiddleware(async (req, res) => {
    const all = await Category.getAll();
    const allCategoriesWithUserPoints = await Category.getUserCategoriesPoints(
      req.user[0].id
    );

    const results = all.map((cat) => {
      const userPoints = allCategoriesWithUserPoints.find(
        (c) => c.id === cat.id
      );
      return {
        ...cat,
        userPoints: userPoints ? userPoints.points : 0,
      };
    });
    return res.json(results);
  })
);

// select one
router.get('/', (req, res) => {
  const { id } = req.query;
  return Category.getById(id)
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
// select one

// insert
router.post('/', (req, res) => {
  const data = req.body;
  return Category.insert(data)
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
  return Category.update(data)
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

  return Category.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
