//Dependencies

var petfinder = require('petfinder')('a839717f845b6ee822240f22a2b5a84c', '6debdbd0c30c89132579a1a722d970ac');
const ejs = require('ejs');
const express = require('express');
const app = express();
require('dotenv').config();

var PORTS = 3000 || 'https://pupfetchrs.herokuapp.com/';
//ejs setup
app.set('view engine', 'ejs');
app.use(express.static("public"));

//app routes
const homeRoute = require('./routes/pages');

app.get('/', homeRoute.getHomePage);
app.get('/search', homeRoute.getDogs);
// app.get('/')


//app start

app.listen(PORTS, function(){
  console.log(`Listening on Port 3000`);
})
