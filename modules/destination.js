var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DesitnationSchema = new Schema({
    location: String,
    date: String,
    budget: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },
    plans: [String],
  });

  var Desitnation = mongoose.model('Desitnation',DesitnationSchema);

  module.exports = Desitnation;
