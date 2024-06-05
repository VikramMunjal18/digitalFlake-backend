const express = require('express');
const { getAllWarehouses, addWarehouse, updateWarehouse, deleteWarehouse } = require('../controllers/Warehouse');

const WarehouseRouter = express.Router();

WarehouseRouter.get('/', getAllWarehouses);
WarehouseRouter.post('/', addWarehouse);
WarehouseRouter.put('/:id', updateWarehouse);
WarehouseRouter.delete('/:id', deleteWarehouse);

module.exports = WarehouseRouter;
