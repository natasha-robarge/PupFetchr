const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  location: String,//is this important? Only searching for dogs by zip code
  savedPets: Array //save pets by id
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema: UserSchema
}
