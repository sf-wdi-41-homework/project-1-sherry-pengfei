var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var staticsController = require('../controllers/staticsController');
var destinationsController = require('../controllers/destinationsController');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we can continue with next
  // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
  if (req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'Login to access!');
  return res.redirect('/login');
}

function unAuthenticatedUser(req, res, next) {
  if (!req.isAuthenticated()) return next();

  // Otherwise
  req.flash('errorMessage', 'You are already logged in!');
  return res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(unAuthenticatedUser, usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(unAuthenticatedUser, usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

// HTML ENDPOINT shows destinations
router.route("/destinations")
  .get(authenticatedUser, destinationsController.destinations);

// API ENDPOINT to get all destinations
router.route("/api/destinations")
  .get(authenticatedUser, destinationsController.allDestinations);

// API ENDPOINT to create a destination
router.route("/api/destinations")
  .post(authenticatedUser, destinationsController.createDestination);

// API ENDPOINT to delete a destination
router.route("/api/destinations/:id")
  .delete(authenticatedUser, destinationsController.deleteDestination);


router.route("/api/destinations/:id")
  .put(authenticatedUser, destinationsController.updateDestination);

module.exports = router
