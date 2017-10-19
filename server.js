var express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./models'),
  controller = require('./controller'),
  session = require('express-session'),
  bcrypt = require('bcryptjs'),
  passport = require('passport');



// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// Express Session Middleware
app.use(session({
 secret: 'secret',
 resave: true,
 saveUninitialized: true
}));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req, res){
  // where is the views folder?
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


//user registration
app.get('/users/register', function(req, res){
  res.sendFile('views/register.html', {root: __dirname});
});

//register proccess
app.post('/users/register', function(req, res){
  console.log('testing');

  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new db.User({
    name:name,
    email:email,
    username:username,
    password:password
  });

  bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
              console.log(err);
          } else {
              newUser.password = hash;
              newUser.save(function(err){
                  if(err){
                      console.log(err);
                      return;
                  } else {
                      console.log("user has been created..");
                      res.redirect('/users/login');
                  }
              });
          }
      });
  });
});

app.get('/users/login', function(req,res){
  res.sendFile('views/login.html', {root: __dirname});
});


// login Process
app.post('/users/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash:true

    })(req, res, next);
});








app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
