var Destination = require('../models/destination');

// GET /
function destinations(req, res) {
  res.render('destinations.ejs', { message: req.flash('errorMessage') });
}

function allDestinations(req, res) {
  Destination.find({userId: req.user._id}, function(err,results){
    if(err){return console.log(err)};
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

  newDestination.save(function(err, yay){
    if(err){return console.log(err)};
    res.json(yay)
  });
}

function deleteDestination(req, res){
  Destination.findOneAndRemove({_id:req.params.id}, function(err, destroy){
    if(err){return console.log(err)};
    res.json(destroy);
  });
}

function updateDestination(req, res){
  Destination.findOne({_id:req.params.id}, function(err,success){
    success.organizer=req.body.updateOrganizer;
    success.location=req.body.updateLocation;
    success.date = req.body.updateDate;
    success.budget = req.body.updateBudget;
    success.plans = req.body.updatePlans.split(',').map(function(item) { return item.trim(); } );
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
