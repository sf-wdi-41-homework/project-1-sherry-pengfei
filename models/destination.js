var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DestinationSchema = new Schema({
    location: String,
    date: String,
    budget: Number,
    currency: String,
    organizer: String,
    plans: [String],
  });

  var Destination = mongoose.model('Destination',DestinationSchema);

  module.exports = Destination;
