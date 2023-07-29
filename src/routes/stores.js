const express = require('express');
const { createRetailers } = require('../controllers/stores');
const router = express.Router();

router.post('/new-retailer', createRetailers)

module.exports = router;