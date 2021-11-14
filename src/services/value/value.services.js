const { Value, Property } = require('../../db');

module.exports = {
    createValueService: async (value,propertyId,vehicleId,propertyName) => {
        return await Value.create({
            value,
            propertyId,
            vehicleId,
            propertyName
        })
    },
    updateValueService: async (valueId,value) => {
            await Value.findByPk(valueId)
            .then(async(response) => {
                    await Value.update({
                        value
                    },{
                        where:{
                            id: valueId
                        }
                    })
                    return response
                });
    },
    fetchAllValues: async () => {
        return await Value.findAll({
            attributes: ['value', 'propertyId', 'vehicleId'],
            include: [{
                model: Property,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        })
    }
}