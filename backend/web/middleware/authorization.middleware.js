const envConfig = require('../../envVars');
var user = require('../../models/user.model');

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt'); 
// var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended:false
}));
router.use(bodyParser.json);

// Checks the integration
function checkIntegration(){
    console.log("Checked Middleware:",envConfig.get("checkIntegration"));
}

module.exports = {checkIntegration};
