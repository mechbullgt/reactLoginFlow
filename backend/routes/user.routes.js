const express = require('express');
const router = express.Router();

// Importing the userController
const _userController = require('../controller/user.controller');

// Route 0: Testing 
router.get('/test',_userController.test);