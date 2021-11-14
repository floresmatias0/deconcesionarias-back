const { 
    createVehicleService,
    updateVehicleService,
    deleteVehicleService,
    fetchOneVehicle
} = require('../../services/vehicle/vehicle.services');
const { body, param } = require('express-validator');
// const {Vehicle, Property} = require('../../db');

module.exports = {
    validatorVehicle: [
        body('name','name is required').not().isEmpty()
    ],
    validatorVehicleId: [
        param('vehicleId')
        .custom(async(vehicleId) => {
            await fetchOneVehicle(vehicleId)
            .then(vehicle => {
                if (!vehicle) throw new Error('Vehicle dont exist');
            });
        }),
    ],
    createVehicleController: (name) => {
        return createVehicleService(name);
    },
    updateVehicleController: (vehicleId,name) => {
        return updateVehicleService(vehicleId,name);
    },
    deleteVehicleController: (vehicleId) => {
        return deleteVehicleService(vehicleId);
    },
    fetchVehicleByIdController: (vehicleId) => {
        return fetchOneVehicle(vehicleId);
    }
}