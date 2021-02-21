const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  // email: String,
  email: {type: String, unique: true, lowercase: true },
  password: String
})

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model class
module.exports = ModelClass;




// Notes
// stephen@gmail.com and STEPHEN@GMAIL.COM are two different for mongoose
