// backend/controllers/City.js
const CityModel = require("../models/City");
const State = require("../models/State");

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await CityModel.find();

    const citiesWithState = await Promise.all(
      cities.map(async (city) => {
        const state = await State.findById(city.stateName);
        return {
          ...city.toObject(),
          state,
        };
      })
    );

    res.status(200).json(citiesWithState);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new city
const addCity = async (req, res) => {
  const { cityName, cityCode, stateName, status } = req.body;
  try {
    const states1 = await State.find({ stateName: stateName });
    console.log(states1);
    if (states1?.length) {
      const newCity = await CityModel.create({
        cityName,
        cityCode,
        stateName: states1[0]?._id,
        status,
      });
      return res.status(201).json(newCity);
    }
    const newState = await State.create({ stateName });
    const newCity = await CityModel.create({
      cityName,
      cityCode,
      stateName: newState._id,
      status,
    });
    
    return res.status(201).json(newCity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a city
const updateCity = async (req, res) => {
  try {
    const current = await State.find({_id:req.body.stateId})
    const updateState = await State.findByIdAndUpdate(current[0]._id,{stateName:req.body.stateName})
    const updatedCity = await CityModel.findByIdAndUpdate(
      req.params.id,
      {
        cityName:req.body.cityName,
        stateId:req.body.stateId,
        status:req.body.status,
        cityCode:req.body.cityCode
      },
      { new: true }
    );
    return res.json(updatedCity);
  } catch (error) {
  console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    await CityModel.findByIdAndDelete(id);
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllCities,
  addCity,
  updateCity,
  deleteCity,
};
