const db = require('../models/user');

function createUser(req, res){
  const newUser = db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  createUser.save (function (err, data){
    if (err) {
      console.log(`Error saving Student in DB, ${err}`);
      res.status(500).send(`Internal server error`)
    } else {
      res.status(201).json(data);
    }

  });

function getUsers(req, res) {
  db.User.find({}, function(err, foundUsers) {
    if (err) {
      res.sendStatus(500).send(`error getting users, ${err}`);
    }
    res.json(foundUsers);
  })
}

function getUser(req, res) {
  db.User.findOne({ id: _id }, function(err, foundUser) {
    if (err) {
      res.sendStatus(500).send(`Could not find user with id, error, ${err}`);
    }
    res.json(foundUser);
  })
}

function updateUser(req, res) {
  const updateUser = db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    savedPets: req.body.savedPets
  });
  db.updatedUser.findOneAndUpdate({id: _id}, function(err, updatedUser) {
    if (err) {
      res.sendStatus(500).send(`Error updating user, ${err}`);
    }
    res.json(updatedUser);
  })
}
