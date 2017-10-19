var LocalStrategy = require("passport-local").Strategy;

var User = require('../models/user');
var config = require('../config/database');
var bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======
var flash = require('flash');
>>>>>>> fb9a48d6e294e091f76bb6052b1fefc65adaaead

module.exports = function(passport){
	// local strategy
	passport.use(new LocalStrategy(function(username, password, done){
		//match username
		var query ={username:username};
		User.findOne(query, function(err, user){
			if(err) throw err;
			if(!user){
<<<<<<< HEAD
				return done(null, false, {message : 'no user found'});
=======
				return done(null, false, {message: flash('no user found')});
>>>>>>> fb9a48d6e294e091f76bb6052b1fefc65adaaead
			}

			//match password
			bcrypt.compare(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				}else{
<<<<<<< HEAD
					return done(null, false, {message: 'wrong password'});
=======
					return done(null, false, {message: flash('wrong password')});
>>>>>>> fb9a48d6e294e091f76bb6052b1fefc65adaaead
				}
			});
		});
	}));

	passport.serializeUser(function(user,done){
		done(null, user.id);
	});


	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});



}