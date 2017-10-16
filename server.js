var express = require('express'),
  bodyParser = require('body-parser'),
  db = require('./modules');

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
  
})




app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
