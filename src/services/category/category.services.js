const { Category, Property } = require('../../db');

module.exports = {
    createCategoryService: async (name, icon) => {
        return await Category.findOrCreate({
            where: {
                name
            },
            defaults: {
                icon
            }
        })
    },
    fetchAllCategories: async () => {
        return await Category.findAll({
            attributes: ['id', 'name', 'icon'],
            include: [{
                model: Property,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }]
        })
    }
}