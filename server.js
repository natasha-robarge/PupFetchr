//Dependencies
// const angular = require('angular');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var petfinder = require('petfinder')('a839717f845b6ee822240f22a2b5a84c', '6debdbd0c30c89132579a1a722d970ac');

require('dotenv').config();

<<<<<<< HEAD




//sets up mongoose connection

=======
//sets up mongoose connection
>>>>>>> 1fac6f92cffe5e207acf5a0ea850703daf508078
mongoose.connection.openUri(process.env.DB_CONN, function(err, conn) {
  if (err) {
    console.log('error connecting to mongo, ', err);
  } else {
    console.log('Successfully connected');
  }
});

//sets up express and port
const app = express();
const port = process.env.PORT || 3000;

//Uses public folder
app.use('/', express.static('public'))


//App routes
<<<<<<< HEAD
const userRoutes = require('../routes/users');
app.get('/', userRoutes.getUser);
app.get('/', userRoutes.getUsers);
app.post('/', userRoutes.createUser);
app.put('/', userRoutes.updateUser);
app.delete('/', userRoutes.removeUser);
app.get('/', userRoutes.newLoginSession);


=======
>>>>>>> 1fac6f92cffe5e207acf5a0ea850703daf508078
app.get('/', function(req, res) {
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
});


<<<<<<< HEAD

//App Start

=======
//App Start
>>>>>>> 1fac6f92cffe5e207acf5a0ea850703daf508078
app.listen(3000, function() {
  console.log('On port 3000');
})
