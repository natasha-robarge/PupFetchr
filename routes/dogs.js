const db = require('../models/dog');

const DogtRoutes = require('./routes/dogs');

function getDogs(req, res) {
  petfinder.findPet(78721, {}, function(err, animals) {
    var result = [];
    animals.forEach(function(animal) {
      for(var prop in animal) {
        if(animal[prop] === 'Dog') {
          result.push({ 'animal': animal })
        }
      }
    })
    res.json(result);
  });
}

module.exports = {
  getDogs: getDogs
}
