const express = require('express');
const router = express.Router();

// Importing the userController
const _userController = require('../controller/user.controller');

// Route 0: Testing 
router.get('/test',_userController.test);
// Route 1: Create/Register, Type: POST, /api/register
router.post('/register',_userController.register);
// Route 2: Get All User, Type: GET, /api/users
router.get('/users',_userController.users);
// Route 3: Validate User / Login, Type POST, /api/login
router.post('/login',_userController.login);

// Expose the router for further usage
module.exports = router;