var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||"mongodb://localhost/Project-1", {useMongoClient: true});


module.exports.Destination = require("./destination.js");
