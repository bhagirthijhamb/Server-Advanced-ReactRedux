const User = require('./../models/user');

exports.signup = function(req, res, next) {
  // res.send({ success: 'true' });

  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password

  // See if a user with the given email exists
  // if the user exists, existingUser will has its details
  // if the user does not exist, existingUser will has null as its value
  User.findOne({ email: email }, function(err, existingUser){
    // err object will show the error which the search itself has error
    // connection to the database fails
    if(err){ 
      console.log(err)
      return next(err); 
    }

    // If a user with email does exist, return an error
    if(existingUser){
      // 422 unprocessable entity
      return res.status(422).send({ error: 'Email is in use' });

    }

    // If a user with email does not exist, create and save user record
      // creates the user in the memory
    const user = new User({ 
      email: email,
      password: password
    })
      //saves the user to the database
      // asynchronous, so we pass a callback function to the save()
    user.save(function(err){
      if(err){ return next(err); };

      // Respond to request indicating the user was created
      // res.json(user);
      res.json({ success: true });
    }); 
  
  })
}