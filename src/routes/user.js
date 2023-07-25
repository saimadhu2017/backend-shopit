const express = require('express');
const { isSignedIn, isAuthenticated, checkValidUser } = require('../controllers/auth');
const { getUserData, checkUserData } = require('../controllers/user');
const router = express.Router();

//Params
router.param('userid', checkValidUser)

//routes
router.get('/:userid', isSignedIn, isAuthenticated, getUserData)

router.get('/validate/:userid', isSignedIn, isAuthenticated, checkUserData)

module.exports = router