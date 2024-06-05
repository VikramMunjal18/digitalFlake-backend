// backend/controllers/StateController.js
const StateModel = require('../models/State');

// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await StateModel.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new state
const addState = async (req, res) => {
  const { stateName, stateCode, status } = req.body;
  try {
    const newState = await StateModel.create({ stateName, stateCode, status });
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a state
const updateState = async (req, res) => {
  try {
    const updatedState = await StateModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedState);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a state
const deleteState = async (req, res) => {
  const { id } = req.params;
  try {
    await StateModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getAllStates,
  addState,
  updateState,
  deleteState
};

// const StateModel = require('../models/State');

// // Get all states
// const getAllStates = async (req, res) => {
//   try {
//     const states = await StateModel.find();
//     res.status(200).json(states);
//   } catch (error) {
//     res.status(500).json({ message: 'getAllStates Server error',error });
//   }
// };

// // Add a new state
// const addState = async (req, res) => {
//   console.log("req.body", req.body);
//   const { stateName, stateCode, status } = req.body;
//   try {
//     const newState = await StateModel.create({ stateName, stateCode, status });
//     res.status(201).json(newState);
//   } catch (error) {
//     console.log("error add State",error);
//     res.status(500).json({ message: 'addState Server error', error });
//   }
// };

// // Update a state
// const updateState = async (req, res) => {
//   try {
//     const updatedState = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedState);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete a state
// const deleteState = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await StateModel.findByIdAndDelete(id);
//     res.status(200).json({ message: 'State deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error',error });
//   }
// };

// module.exports ={
//   getAllStates,
// addState,
// updateState,
// deleteState,
// }
