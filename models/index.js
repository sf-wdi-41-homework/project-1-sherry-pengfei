var mongoose = require('mongoose');
var config = require("../config/database");




mongoose.connect( process.env.MONGODB_URI || config.database, {useMongoClient: true});



module.exports.Destination = require("./destination.js");

module.exports.User = require('./user.js');
