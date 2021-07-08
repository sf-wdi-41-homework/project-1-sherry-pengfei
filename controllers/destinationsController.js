var Destination = require('../models/destination');

// GET /
function destinations(req, res) {
  res.render('destinations.ejs', { message: req.flash('errorMessage') });
}

function allDestinations(req, res) {
  Destination.find({userId: req.user._id}, function(err,results){
    if(err){return console.log(err)}
    res.json(results);
  })
}

function createDestination(req, res) {
  req.body.plans = req.body.plans.split(',').map(function(item) { return item.trim(); } );

  console.log(req.body);
  var newDestination = new Destination({
    userId:req.user._id,
    organizer: req.body.organizer,
    location: req.body.location,
    date: req.body.date,
    budget: req.body.budget,
    plans: req.body.plans,
  });
  // lol, great argument names! YAY!
  newDestination.save(function(err, yay){
    if(err){return console.log(err)};
    res.json(yay)
  });
}

function deleteDestination(req, res){
  // there is no second object returned named destroy
  // err should be the only returned value of the findOneAndRemove method
  Destination.findOneAndRemove({_id:req.params.id}, function(err, destroy){
    if(err){return console.log(err)};
    res.json(destroy);
  });
}

function updateDestination(req, res){
  // the first argument of Model.findOne are the search parameters. The
  // second argument, the callback function, merely does something with that
  // object which was found. 'success' is destination that was found.
  // You did not need to try to save it again.
  // success should be named 'destination' here
  Destination.findOne({_id:req.params.id}, function(err,success){
    success.organizer=req.body.updateOrganizer;
    success.location=req.body.updateLocation;
    success.date = req.body.updateDate;
    success.budget = req.body.updateBudget;
    success.plans = req.body.updatePlans.split(',').map(function(item) { return item.trim(); } );
    // Again, this was unnecessary.
    success.save(function(err, update){
      if(err){return}
      res.json(update);
    });
  });
}

module.exports = {
  destinations: destinations,
  allDestinations: allDestinations,
  createDestination: createDestination,
  deleteDestination: deleteDestination,
  updateDestination: updateDestination
}
