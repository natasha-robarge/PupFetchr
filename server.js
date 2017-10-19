//Dependencies
// const angular = require('angular');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var petfinder = require('petfinder')('a839717f845b6ee822240f22a2b5a84c', '6debdbd0c30c89132579a1a722d970ac');
require('dotenv').config();

//sets up mongoose connection
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
app.use('/', express.static('public'));

//App routes
const userRoutes = require('./routes/users');
const dogRoutes = require('./routes/dogs');


app.get('/dogs', dogRoutes.getDogs);
app.get('/', userRoutes.getUsers);
app.get('/:id', userRoutes.getUser);
app.post('/', userRoutes.createUser);
app.put('/', userRoutes.updateUser);
app.delete('/', userRoutes.removeUser);
// app.get('/', userRoutes.newLoginSession);



//App Start
app.listen(3000, function() {
  console.log('On port 3000');
})
