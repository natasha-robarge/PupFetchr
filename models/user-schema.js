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

UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
}

UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({email: email, }, function(foundUser) {
    if(!foundUser) {
      callback(new Error(`Couldn't find user with email, ${email}`));
    } else {
      foundUser.checkPassword(password, function(err, passwordMatch) {
        if(err || !passwordMatch) {
          callback(new Error(`Could not authenticate password, wrong password.`));
        } else {
          callback(null, foundUser);
        }
      })
    }
  });
}

const User = mongoose.model('User', UserSchema);

User.createSecure();

module.exports = User;
