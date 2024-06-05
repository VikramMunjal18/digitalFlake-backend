// backend/routes/StateRoutes.js
const express = require('express');
const { getAllStates, addState, updateState, deleteState } = require('../controllers/State');

const StateRouter = express.Router();

StateRouter.get('/', getAllStates);
StateRouter.post('/', addState);
StateRouter.put('/:id', updateState);
StateRouter.delete('/:id', deleteState);

module.exports = StateRouter;
