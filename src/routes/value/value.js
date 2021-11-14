const server = require('express').Router();
const { validationResult } = require('express-validator');
const { fetchAllValues } = require('../../services/value/value.services');
const { 
    validatorValue,
    createValueController,
    updateValueController 
} = require('../../controllers/value/value.controller');

server.get('/', (req, res, next) => {
    fetchAllValues()
    .then(values => {
        return res.status(201).send({
            success: true,
            data: values
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
})

server.post('/', validatorValue, (req, res, next) => {
    const {value,propertyId,vehicleId,propertyName} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    createValueController(value,propertyId,vehicleId,propertyName)
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

server.put('/', validatorValue, (req, res, next) => {
    const {valueId,value} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    updateValueController(valueId,value)
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