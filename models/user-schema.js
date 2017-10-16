const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  location: String,//is this important? Only searching for dogs by zip code
  savedPets: Array //save pets by id
});

UserSchema.statics.createSecure = function(email, password, callback) {
  const UserModel = this;

  bcrypt.genSalt(function(err, salt) {
    console.log(`Smack dat salt, ${salt}`);
    bcrypt.hash(password, salt, function(err, hash) {
      UserModel.create({
        email: email,
        passwordHash: hash
      }, callback);
    });
  });
}



const User = mongoose.model('User', UserSchema);

module.exports = User;
