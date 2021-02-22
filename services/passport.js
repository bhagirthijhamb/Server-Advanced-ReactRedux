const passport = require('passport');
const User = require('./../models/user');
const config = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup optoins for JWT Strategy
const jwtOptions = {
  jwtFromRequest = ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user id in the payload exists in our database
  // If it does, call 'done' with that other
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, flase);}
    if(user){
      done(null, user);
    } else {
      done(null, false);
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin);