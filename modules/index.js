var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI ||"mongodb://localhost/Project-1", {useMongoClient: true});


module.exports.Desitnation = require("./destination.js");
module.exports.Author = require("./author.js");
