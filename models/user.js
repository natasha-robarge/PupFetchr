//Dependencies/ requirements
const mongoose = require('mongoose');
//bcrypt is what we use to hash passwords.
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  location: String,//is this important? Only searching for dogs by zip code
  savedPets: Array //save pets by id
});

//This function is a secure function, err, it's creating something that is secure.
UserSchema.statics.createSecure = function(email, password, callback) {
  /* by storing 'this' as UserModel, we automatically can be reassured that
  we won't lose the first pieces of data we're given so if we need what our input is,
  we can console log UserModel and receive that info.
  */
  const UserModel = this;

  /* genSalt is a bcrypt function that creates a salt for when we hash the password.
  we hash the password within the salt function and create a usermodel based off of our
  inputs. The hash creates a cryptic password and then uses salt to make it random. */
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

/* This uses a method to check the password of the user from the userschema.
By using bcrypt's compare function, we are able to compare the inputted password to
the password that was hashed and stored in the database from the above function.*/
UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
}

/* Now, after checking the passwords, we have to make sure that the user is not a bot.
Here is where we find the email given in the database to see if it matches the correct user.
if it doesn't match, the email doesn't exist in the database. if the passwords don't match,
then it isn't the user trying to log in. */
UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({email: email, }, function(foundUser) {
    if(!foundUser) {
      callback(throw new Error(`Couldn't find user with email, ${email}`));
    } else {
      foundUser.checkPassword(password, function(err, passwordMatch) {
        if(err || !passwordMatch) {
          callback(throw new Error(`Could not authenticate password, wrong password.`));
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
