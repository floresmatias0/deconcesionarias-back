const { 
    createCategoryService,
    updateCategoryService,
    deleteCategoryService 
} = require('../../services/category/category.services');
const { body } = require('express-validator');

module.exports = {
    validatorCategory: [
        body('name','name is required').not().isEmpty(),
        body('icon','icon is required').not().isEmpty()
    ],
    createCategoryController: (name,icon) => {
        return createCategoryService(name,icon)
    },
    updateCategoryController: (categoryId,name,icon) => {
        return updateCategoryService(categoryId,name,icon)
    },
    deleteCategoryController: (categoryId) => {
        return deleteCategoryService(categoryId)
    }
}