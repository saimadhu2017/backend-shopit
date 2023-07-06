const express = require('express');
const { isSignedIn, isAuthenticated, checkValidUser } = require('../controllers/auth');
const { getUserData } = require('../controllers/user');
const router = express.Router();

//Params
router.param('userid', checkValidUser)

//routes
router.get('/:userid', isSignedIn, isAuthenticated, getUserData)

module.exports = router