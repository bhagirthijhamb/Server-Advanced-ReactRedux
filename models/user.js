const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  // email: String,
  email: {type: String, unique: true, lowercase: true },
  password: String
})

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next){
  // get access to user model
  const user = this;

  // generate a salt then run callback
  // (salt generation takes some time, so we pass a callback function)
  bcrypt.genSalt(10, function(err, salt){
    if(err){ 
      return next(err) 
    };
    
    // hash (encrypt) our password using the salt
    // (hashing takes some time, so we pass a callback function)
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ 
        return next(err); 
      };

      // overwrite plain text password with encrypted password
      user.password = hash;
      // next() mean go ahead and save the model
      next(); 
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }

    callback(null, isMatch);
  })
}

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model class
module.exports = User;




// Notes
// stephen@gmail.com and STEPHEN@GMAIL.COM are two different for mongoose
