const server = require('express').Router();
const { validationResult } = require('express-validator');
const { fetchAllCategories } = require('../../services/category/category.services');
const { 
    validatorCategory,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController
} = require('../../controllers/category/category.controller');

server.get('/', (req, res, next) => { 
    fetchAllCategories()
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

server.post('/', validatorCategory, (req, res, next) => {
    const {name, icon} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    createCategoryController(name,icon)
    .then(category => {
        return res.status(201).send({
            success: true,
            data: category
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.put('/:categoryId', (req, res, next) => {
    const {name, icon} = req.body;
    const {categoryId} = req.params;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    updateCategoryController(categoryId,name,icon)
    .then(category => {
        return res.status(201).send({
            success: true,
            data: category
        })
    })
    .catch(err => {
        return res.status(401).send({
            success: false,
            data: err
        })
    })
});

server.delete('/:categoryId', (req, res, next) => {
    const {categoryId} = req.params;

    deleteCategoryController(categoryId)
    .then(category => {
        return res.status(201).send({
            success: true,
            data: category
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