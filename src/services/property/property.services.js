const { Property, Category } = require('../../db');

module.exports = {
    createPropertyService: async (name, categoryId) => {
        return await Property.findOrCreate({
            where: {
                name
            },
            defaults: {
                categoryId
            }
        })
    },
    fetchAllProperties: async () => {
        return await Property.findAll({
            attributes: ['name', 'categoryId', 'id'],
            include: [{
                model: Category
            }]
        })
    },
    updatePropertyService: async (propertyId, name, categoryId) => {
            return await Property.update({
                name,
                categoryId
            },{
                where:{
                    id: propertyId
                }
            })
            .then(async() => await Property.findByPk(propertyId))
    },
    deletePropertyService: async (propertyId) => {
        return await Property.destroy({
            where:{
                id: propertyId
            }})
    },
}