const server = require('express').Router();
const { validationResult } = require('express-validator');
const { fetchAllProperties } = require('../../services/property/property.services');
const { 
    createPropertyController,
    validatorProperty,
    updatePropertyController,
    deletePropertyController 
} = require('../../controllers/property/property.controller');


server.get('/', (req, res, next) => { 
    fetchAllProperties()
    .then(categories => {
        return res.status(201).send({
            success: true,
            data: categories
        })
    }) 
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.post('/', validatorProperty, (req, res, next) => {
    const {name, categoryId} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    createPropertyController(name,categoryId)
    .then(property => {
        return res.status(201).send({
            success: true,
            data: property
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.put('/:propertyId', (req, res, next) => {
    const {name, categoryId} = req.body;
    const {propertyId} = req.params;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    updatePropertyController(propertyId,name,categoryId)
    .then(property => {
        return res.status(201).send({
            success: true,
            data: property
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.delete('/:propertyId', (req, res, next) => {
    const {propertyId} = req.params;

    deletePropertyController(propertyId)
    .then(property => {
        return res.status(201).send({
            success: true,
            data: property
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