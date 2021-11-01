const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');

const User = require('../db/queryBuilders/User');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '123';
module.exports = passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    //
    return User.getById(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
