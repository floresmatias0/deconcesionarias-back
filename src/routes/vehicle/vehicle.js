const server = require('express').Router();
const { validationResult } = require('express-validator');
const { fetchAllVehicles } = require('../../services/vehicle/vehicle.services');
const { 
    validatorVehicle,
    createVehicleController,
    updateVehicleController,
    deleteVehicleController,
    validatorVehicleId,
    fetchVehicleByIdController
} = require('../../controllers/vehicle/vehicle.controller');

server.get('/', (req, res, next) => {
    fetchAllVehicles()
    .then(vehicles => {
        return res.status(201).send({
            success: true,
            data: vehicles
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
})

server.get('/:vehicleId', validatorVehicleId, (req, res, next) => {
    const {vehicleId} = req.params;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    fetchVehicleByIdController(vehicleId)
    .then(vehicle => {
        return res.status(201).send({
            success: true,
            data: vehicle
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
})

server.post('/', validatorVehicle, (req, res, next) => {
    const {name} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    createVehicleController(name)
    .then(vehicle => {
        return res.status(201).send({
            success: true,
            data: vehicle
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.put('/:vehicleId', validatorVehicle, (req, res, next) => {
    const {name} = req.body;
    const {vehicleId} = req.params
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    updateVehicleController(vehicleId,name)
    .then(value => {
        return res.status(201).send({
            success: true,
            data: value
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.delete('/:vehicleId', validatorVehicleId,  (req, res, next) => {
    const {vehicleId} = req.params
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    deleteVehicleController(vehicleId)
    .then(value => {
        return res.status(201).send({
            success: true,
            data: value
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

module.exports = server;