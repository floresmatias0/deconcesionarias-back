const { createValueService, updateValueService } = require('../../services/value/value.services');
const { body } = require('express-validator');

module.exports = {
    validatorValue: [
        body('value','value is required').not().isEmpty()
    ],
    createValueController: (value,propertyId,vehicleId,propertyName) => {
        return createValueService(value,propertyId,vehicleId,propertyName)
    },
    updateValueController: (valueId,value) => {
        return updateValueService(valueId,value)
    }
}