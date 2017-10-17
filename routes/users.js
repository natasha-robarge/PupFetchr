const db = require('../models/user');

//render homepage for connecting to server.js

/* function getHomePage(req, res) {
  //NOTE: This won't work! The reason why is because it will load automatically as an html file.
  //So this isn't valid until we change our format to ejs. Take a look at w05/d02, and
  //give me a second opinion.
  //                            - Love, Nat/Nata
  res.render('index')
}
*/
//creates a user
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

    //I was looking at the w05/d02 starter code on the authentication and found this.
    /*
    User.createSecure(req.body.email, req.body.password, function(err, savedUser) {
      if (err) {
        res.status(500).send(`Something went wrong ${err}`);
      } else {
      res.json(savedUser);
      }
    });
    */

    //Thoughts??
  });

//gets users
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

//gets a user
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

//Updates a user
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

//Removes a user
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

//Authenticates User at Login
function newLoginSession(req, res) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      res.status(407).send(`Error processing login: ${err.message}`);
    } else {
      res.json(user);
    }
  });
}


module.exports = {
  createUser: createUser,
  getUser: getUser,
  getUsers: getUsers,
  updateUser: updateUser,
  removeUser: removeUser,
  newLoginSession: newLoginSession
}
