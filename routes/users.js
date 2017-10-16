const db = require('../models/user');

function createUser(req, res){
  const newUser = db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  createUser.save (function (err, data){
    //if there is an error
    if (err) {
      console.log(`Error saving Student in DB, ${err}`);
      res.status(500).send(`Internal server error`)
    } else {
      //if there isn't an error
      res.status(201).json(data);
    }

  });

function getUsers(req, res) {
  db.User.find({}, function(err, foundUsers) {
    //if there is an error
    if (err) {
      res.sendStatus(500).send(`error getting users, ${err}`);
    }
    //if there isn't an error
    res.json(foundUsers);
  })
}

function getUser(req, res) {
  db.User.findOne({ id: _id }, function(err, foundUser) {
    //if there is an error
    if (err) {
      res.sendStatus(500).send(`Could not find user with id, error, ${err}`);
    }
    //if there isn't an error
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
    //if there is an error
    if (err) {
      res.sendStatus(500).send(`Error updating user, ${err}`);
    }
    //if there isn't an error
    res.json(updatedUser);
  })
}

function removeUser(req, res) {
  db.User.findOneAndRemove({id: _id}, function(err, removedUser) {
    //if there is an error
    if (err) {
      res.sendStatus(500).send(`Error removing user, ${err}`);
    }
    //if there isn't an error
    res.json(`${removedUser}, is the user that has been removed.`);
  })
}
