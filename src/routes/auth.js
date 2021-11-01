const express = require('express');
const asyncMiddleware = require('../db/middlewares/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Category = require('../db/queryBuilders/Category');
const User = require('../db/queryBuilders/User');
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

module.exports = router;
