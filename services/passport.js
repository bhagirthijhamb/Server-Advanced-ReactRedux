const passport = require('passport');
const User = require('./../models/user');
const config = require('./../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

// Create local Strategy
const localOptions = { usernameField: 'email' }; // password is handled automatically
const localLogin = new localStrategy(localOptions, function(email, password, done){
  // Verify this username and pssword, call done with the user if it is the correct email and password
  // otherwise, call done with false
  // doing a search is asynchronous, so we provide a callback function
  User.findOne({ email: email }, function(err, user){
    if(err){ return done(err); }
    if(!user){ return done(null, false); }

    // compare passwords - is `password` equal to user.password
    user.comparePassword(password, function(err, isMatch){
      if(err){ return done(err); }
      if(!isMatch){ return done(null, false); }

      // call the passport callback with the user
      return done(null, user);
    })
  })
})

//Setup optoins for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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
passport.use(localLogin);