const mongoose = require('mongoose');
const { Schema } = require('mongoose');

let BarSchema = new Schema({
  bar_id: { type: String, unique: true, required: true },
  name: { type: String, trim: true, require: true },
  image_url: { type: String, trim: true },
  votes: { type: Number, defualt: 0 },
  voters: [{
    _user: { type: Schema.Types.ObjectId }
  }]
});

let Bar = mongoose.model('Bar', BarSchema);

module.exports = Bar;
