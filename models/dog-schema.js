const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    name: String,
    Age: String,
    Breed: String,
    Fixed: Boolean,
    Size: String,
    Gender: String,
    Location: String,//enter zip code
    image: '',

});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = {
  DogSchema: DogSchema
}
