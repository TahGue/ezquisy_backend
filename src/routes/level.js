const express = require("express");
const Level = require("../db/queryBuilders/Level");
const router = express.Router();

// select all
router.get("/all", (req, res) => {
  return Level.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});

// select one
router.get("/", (req, res) => {
  const { id } = req.query;
  return Level.getById(id)
    .then((data) => {
      if (data.length <= 0) {
        res.sendStatus(404).send("not found");
      }
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});
// insert
router.post("/", (req, res) => {
  const data = req.body;
  return Level.insert(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send(err);
    });
});
// update
router.put("/", (req, res) => {
  const data = req.body;
  return Level.update(data)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// delete
router.delete("/", (req, res) => {
  const id = req.query.id;

  return Level.delete(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
