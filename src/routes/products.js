const express = require('express');
const { createCatgory, createBrand, createProduct, getProductsByNameSearch } = require('../controllers/products');
const router = express.Router();

router.post('/new-category', createCatgory)

router.post('/new-brand', createBrand)

router.post('/new-product', createProduct)

router.get('/product-search', getProductsByNameSearch)

module.exports = router;