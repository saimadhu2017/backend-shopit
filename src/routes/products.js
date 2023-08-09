const express = require('express');
const { createCatgory, createBrand, createProduct, getProductsByNameSearch } = require('../controllers/products');
const { checkValidUser, isSignedIn, isAuthenticated } = require('../controllers/auth');
const router = express.Router();

//Params
router.param('userid', checkValidUser)

//routes
router.post('/new-category', createCatgory)

router.post('/new-brand', createBrand)

router.post('/new-product', createProduct)

router.get('/product-search/:userid', isSignedIn, isAuthenticated, getProductsByNameSearch)

module.exports = router;