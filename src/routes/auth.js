const express = require('express');
const router = express.Router();
const { signUp, signIn, signOut } = require('../controllers/auth')

//auth routes
router.post('/signup', signUp)
router.get('/signin', signIn)
router.get('/signout', signOut)

module.exports = router;