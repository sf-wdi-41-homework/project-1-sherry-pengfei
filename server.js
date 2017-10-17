var express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./modules');
  controller = require('./controller')

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res){
 res.sendFile('views/index.html', {root: __dirname});
});

app.get('/destination', function(req, res){
  db.Destination.find(function(err,located){
    if(err){return console.log(err)};
    res.json(located)
  })
})

app.post('/destination', function(req, res){

  req.body.plans = req.body.plans.split(',').map(function(item) { return item.trim(); } );

  console.log(req.body);
  var newDestination = new db.Destination({
    location: req.body.location,
    date: req.body.date,
    budget: req.body.budget,
    plans: req.body.plans,
  });

  newDestination.save(function(err, yay){
    if(err){return console.log(err)};
    res.json(yay)
  })
})

app.delete('/destination/:id', function(req, res){
  db.Destination.findOneAndRemove({_id:req.params.id}, function(err, destroy){
    if(err){return console.log(err)};
    res.json(destroy);
  })
})





app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
