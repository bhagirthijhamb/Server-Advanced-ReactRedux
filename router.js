const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

// export a function from this file
// import it to the index.js file and we wil passs app into that imported function
// this way we will have access to app in this file

  // module.exports = function(app){
  //   app.get('/', function(req, res, next){
  //     res.send(['waterBottle', 'paper'])
  //   })
  // }

module.exports = function(app){
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  })
  app.post('/signup', Authentication.signup);
}