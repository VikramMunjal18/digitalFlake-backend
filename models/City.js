// backend/models/City.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true
  },
  cityCode: {
    type: String,
    required: true
  },
  stateName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

const City = mongoose.model('City', citySchema);
module.exports = City;
