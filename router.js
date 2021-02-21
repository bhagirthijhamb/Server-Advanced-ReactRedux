const Authentication = require('./controllers/authentication');

// export a function fron this file
// import it to the index.js file and we wil passs app into that imported function
// this way we will have access to app in this file

  // module.exports = function(app){
  //   app.get('/', function(req, res, next){
  //     res.send(['waterBottle', 'paper'])
  //   })
  // }

module.exports = function(app){
  app.post('/signup', Authentication.signup);
}