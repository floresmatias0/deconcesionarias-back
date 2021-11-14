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
    }
}