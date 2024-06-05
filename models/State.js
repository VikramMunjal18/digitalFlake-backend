// backend/models/State.js
const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  stateName: {
    type: String,
    // required: true
  },
  stateCode: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

const State = mongoose.model('State', stateSchema);
module.exports = State;

// // backend/models/State.js
// const mongoose = require('mongoose');

// const stateSchema = new mongoose.Schema({
//   stateName: {
//     type: String,
//     required: true
//   },
//   stateCode: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Active', 'Inactive'],
//     default: 'Active'
//   }
// });

// const State = mongoose.model('State', stateSchema);
// module.exports = State;

