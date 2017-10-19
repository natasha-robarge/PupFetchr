//Dependencies
const petfinder = require('petfinder')('a839717f845b6ee822240f22a2b5a84c', '6debdbd0c30c89132579a1a722d970ac');

// let zip = 78721;

//functions

//console.log(petfinder, 'petfinder')

function getHomePage(req, res) {
  res.render('home');
}

function getSignUpPage(req, res) {
    res.render('signup');
}

function getCartPage(req, res) {
  res.render('cart');
}

function getSearchPage(req, res) {
  res.render('search');
}

function getDogs(req, res) {
  console.log(req.params)

  console.log('GET DOGS!');
  petfinder.findPet(req.params.zip, {}, function(err, animals) {
    var result = [];
    animals.forEach(function(animal) {
      for(var prop in animal) {
        if(animal[prop] === 'Dog') {
          result.push({ 'animal': animal })
        }
      }
    })
    //res.send(result);
    var photoArray = [];

    //console.log(result[0].animal.contact.zip)

    for(var i = 0; i < result.length; i++) {
      for(var key in result[i].animal.media.photos) {
        //console.log('I am here, ', result[i].animal.media.photos[key].pnt)
        photoArray.push(result[i].animal.media.photos[key].pnt)
      }
    }
    //console.log(photoArray);
    //console.log('RENDERING DOGS!');
    res.render('search', { animals: result, photos: photoArray });
  });
}

function newLoginSession(req, res) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      res.status(407).send(`Error processing login: ${err.message}`);
    } else {
      user.push(req.body.email, req.body.password);
      res.json(user);
    }
  });
}

module.exports = {
  getHomePage: getHomePage,
  getDogs: getDogs,
  getSignUpPage: getSignUpPage,
  getCartPage: getCartPage,
  getSearchPage: getSearchPage,
  newLoginSession: newLoginSession
}
