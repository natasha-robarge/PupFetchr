const db = require('../models/user');

function createUser(req, res){
  const newUser = db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,

  });
  createUser.save (function (err, data){
    if (err){
      console.log('Error saving Student in DB', err);
      res.status(500).send('Internal server error')
    } else {
      res.status(201).jason(data);
    }

  });
