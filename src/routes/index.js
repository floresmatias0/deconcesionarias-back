const { Router } = require('express');

const category = require('./category/category.js');
const property = require('./property/property.js');
const vehicle = require('./vehicle/vehicle.js');
const value = require('./value/value.js');

const router = Router();

router.get('/', (req, res, next) => {
    res.send(`
        Bienvenido al backend <br/> 
        <a href="/category">category</a> <br/>
        <a href="/property">property</a>`)
})

router.use('/category', category);
router.use('/property', property);
router.use('/vehicle', vehicle);
router.use('/value', value);

module.exports = router;