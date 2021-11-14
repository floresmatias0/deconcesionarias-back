const {Vehicle, Property, Value, Category} = require('../../db');
const {fetchAllProperties} = require('../property/property.services');
const {createValueService} = require('../value/value.services');

module.exports = {
    createVehicleService: async (name) => {
        return await Vehicle.findOrCreate({
            where: {
                name
            }
        })
        .then(response => {
            fetchAllProperties()
            .then(properties => {
                let vehicleId = response[0].id

                properties.forEach(current => {
                    let propertyId = current.id
                    let propertyName = current.name
                    let vehicle;
                    
                    return Vehicle.findByPk(vehicleId,{
                        include: [{
                            model: Property, as: 'property'
                        }]
                    })
                    .then((findVehicle) => {
                        vehicle = findVehicle;
                        return Property.findByPk(propertyId,{
                            include: [{
                                model: Category
                            }]
                        });
                    })
                    .then((addedProperty) => {
                        const vehicleProperties = vehicle.getDataValue('property');
                        vehicleProperties.push(addedProperty)
                        vehicle.setProperty(vehicleProperties);
                    })
                    .then(() => createValueService(0,propertyId,vehicleId,propertyName))
                    
                })
            })
            return response
        })
    },
    updateVehicleService: async (vehicleId,name) => {
        return await Vehicle.update({
            name
        },{
            where:{
                id: vehicleId
            }
        })
        .then(async() => await Vehicle.findByPk(vehicleId))
    },
    deleteVehicleService: async (vehicleId) => {
        return await Vehicle.destroy({
            where:{
                id: vehicleId
            }})
    },
    fetchAllVehicles: async () => {
        return await Vehicle.findAll()
    },
    fetchOneVehicle: async (vehicleId) => {
        return await Vehicle.findByPk(vehicleId,{
            include: [{
                model: Value, 
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Property, 
                as: 'property',
                include: [
                    { 
                        model: Category 
                    }
                ]
            }]
        })
    }
}