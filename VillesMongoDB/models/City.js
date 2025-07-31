const mongoose = require('mongoose')

const citySchema = mongoose.Schema({
  name: String,
  country: String,
  region: String,
  description: String
});

const city = mongoose.model('City', citySchema);

module.exports;