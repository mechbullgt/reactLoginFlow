const express = require('express');
const router = express.Router();

// Importing the userController
const _userController = require('../controller/user.controller');

// Route 0: Testing 
router.get('/test',_userController.test);
// Route 1: Create/Register, Type: POST, /api/register
router.get('/register',_userController.register);

// Expose the router for further usage
module.exports = router;