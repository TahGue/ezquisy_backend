const express = require('express');
const asyncMiddleware = require('../db/middlewares/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Category = require('../db/queryBuilders/Category');
const User = require('../db/queryBuilders/User');
const { restart } = require('nodemon');
const router = express.Router();

// login
router.post(
  '/login',
  asyncMiddleware(async (req, res) => {
    // recieve email password
    const { email, password } = req.body;

    // check email is exist
    const [userByEmail] = await User.getByEmail(email);

    if (userByEmail) {
      // compare password with password in db
      const isMatch = await bcrypt.compare(password, userByEmail.password);

      if (isMatch) {
        const payload = {
          id: userByEmail.id,
          name: userByEmail.name,
          email: userByEmail.email,
          tel: userByEmail.tel,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: 'bearer ' + token,
            });
          }
        );
      } else {
        res.sendStatus(400).send('not auth');
      }
    } else {
      res.sendStatus(400).send('not auth');
    }

    //
  })
);

// Register
router.post(
  '/register',
  asyncMiddleware(async (req, res) => {
    // fetch data from register form
    const { name, email, password, image } = req.body;
    // check if email is exist in db
    const [userByEmail] = await User.getByEmail(email);
    // if user email is exist:
    if (userByEmail) {
      return res.send('User already exist');
    }
    // user email is not exist
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;

        User.insert({
          name,
          email,
          image,
          password: hash,
        }).then((us) => res.send(us));
      });
    });
  })
);
module.exports = router;
