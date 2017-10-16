// const angular = require('angular');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var petfinder = require('petfinder')('a839717f845b6ee822240f22a2b5a84c', '6debdbd0c30c89132579a1a722d970ac');

require('dotenv').config();

mongoose.connection.openUri(process.env.DB_CONN, function(err, conn) {
  if (err) {
    console.log('error connecting to mongo, ', err);
  } else {
    console.log('Successfully connected');
  }
})

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  petfinder.findPet( [78721], {}, function(err, shelt) {
    res.json(shelt)
  });
  console.log('hi');
})



// pets = petfinder.findPet('dog', []),
// pets.count

app.listen(3000, function() {
  console.log('On port 3000');
})
