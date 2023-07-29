const express = require('express');
const { createCatgory, createBrand } = require('../controllers/products');
const router = express.Router();

router.post('/new-category', createCatgory)

router.post('/new-brand', createBrand)

router.post('/new-product', () => {

})

router.get('/product-search', () => {

})

module.exports = router;