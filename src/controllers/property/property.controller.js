const { 
    createPropertyService,
    updatePropertyService,
    deletePropertyService
} = require('../../services/property/property.services');
const { body } = require('express-validator');

module.exports = {
    validatorProperty: [
        body('name','name is required').not().isEmpty(),
        body('categoryId','categoryId is required').not().isEmpty()
    ],
    createPropertyController: (name,categoryId) => {
        return createPropertyService(name,categoryId)
    },
    updatePropertyController: (propertyId, name,categoryId) => {
        return updatePropertyService(propertyId, name,categoryId)
    },
    deletePropertyController: (propertyId) => {
        return deletePropertyService(propertyId)
    }
}