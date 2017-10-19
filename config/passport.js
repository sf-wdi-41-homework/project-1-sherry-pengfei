var LocalStrategy = require("passport-local").Strategy;

var User = require('../models/user');
var config = require('../config/database');
var bcrypt = require('bcryptjs');
var flash = require('flash');

module.exports = function(passport){
	// local strategy
	passport.use(new LocalStrategy(function(username, password, done){
		//match username
		var query ={username:username};
		User.findOne(query, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: flash('no user found')});
			}

			//match password
			bcrypt.compare(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				}else{
					return done(null, false, {message: flash('wrong password')});
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