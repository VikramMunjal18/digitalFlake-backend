// backend/routes/city.js
const express = require('express');
const { getAllCities, addCity, updateCity, deleteCity } = require('../controllers/City');

const CityRouter = express.Router();

CityRouter.get('/', getAllCities);
CityRouter.post('/', addCity);
CityRouter.put('/:id', updateCity);
CityRouter.delete('/:id', deleteCity);

module.exports = CityRouter;
