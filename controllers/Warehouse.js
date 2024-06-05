const State = require("../models/State");
const WarehouseModel = require("../models/Warehouse");

// Get all warehouses
const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await WarehouseModel.find();
    console.log("states", "jj", warehouses);
    const citiesWithState = await Promise.all(
      warehouses.map(async (warehouse) => {
        console.log(warehouses);
        const state = await State.findById(warehouse.state);
        return {
          ...warehouse.toObject(),
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

// Add a new warehouse
const addWarehouse = async (req, res) => {
  const { name, state, city, status } = req.body;
  try {
    const states1 = await State.find({ stateName: state });
    console.log(states1, "states1");
    if (states1?.length) {
      const newWarehouse = await WarehouseModel.create({
        name,
        state: states1[0]?._id,
        city,
        status,
      });
      return res.status(201).json(newWarehouse);
    } 
    const newState = await State.create({ stateName: state });
    const newWarehouse = await WarehouseModel.create({
      name,
      state: newState[0]._id,
      city,
      status,
    });
    res.status(201).json(newWarehouse);
  } catch (error) {
    console.log(error,"errorerror");
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a warehouse
const updateWarehouse = async (req, res) => {
  try {
    const current = await State.find({ _id: req.body.stateId });
    console.log("current", current);
    const updateState = await State.findByIdAndUpdate(current[0]._id, {
      stateName: req.body.stateId,
    });

    const updatedWarehouse = await WarehouseModel.findByIdAndUpdate(
      req.params.id,
      {
        city: req.body.city,
        name: req.body.name,
        state: req.body.state,
        status: req.body.status,
      }
    );

    res.json(updatedWarehouse);
  } catch (error) {
    console.log("err", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a warehouse
const deleteWarehouse = async (req, res) => {
  const { id } = req.params;
  try {
    await WarehouseModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
