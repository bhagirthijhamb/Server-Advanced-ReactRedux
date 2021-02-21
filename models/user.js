const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  // email: String,
  email: {type: String, unique: true, lowercase: true },
  password: String
})

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model class
module.exports = User;




// Notes
// stephen@gmail.com and STEPHEN@GMAIL.COM are two different for mongoose
