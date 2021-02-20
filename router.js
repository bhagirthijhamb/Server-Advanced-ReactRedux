// export a function fron this file
// import it to the index.js file and we wil passs app into that imported function
// this way we will have acceess to app in this file
module.exports = function(app){
  app.get('/', function(req, res, next){
    res.send(['waterBottle', 'paper'])
  })
}