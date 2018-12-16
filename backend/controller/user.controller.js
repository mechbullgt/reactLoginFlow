const UserModel = require('../models/user.model');
const envConfig = require('../envVars');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Exporting the controller
module.exports = {
    test: (req, res) => {
        res.send('Test Successful');
    },
    getToken: (req, res) => {
        console.log('Generating access token');
        const tokenValidity = 1200;
        var token = jwt.sign({
            id: req.body._id
        }, envConfig.get("JWT_SECRET"), {
                expiresIn: tokenValidity
            });
        res.send({
            message: "Access Token is valid for: " + tokenValidity,
            token: token
        })
        console.log('Ended generating access token');
    },
    register: (req, res) => {
        console.log("Process started to Register a new user");
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let user = new UserModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            userid: req.body.userid,
            password: hashedPassword,
            role: req.body.role
        });

        // Saving the user to the database
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // On success entry to database
            var token = jwt.sign({
                id: user._id
            }, envConfig.get('JWT_SECRET'), {
                    expiresIn: 60
                });
            res.send({
                message: 'User registered successfully',
                token: token
            });
        })
        console.log('Ended user registeration process');
    },
    users: (req, res) => {
        console.log("Started Finding all users")
        UserModel.find(function (err, users) {
            if (err) {
                return next(err);
            }
            res.send(users);
        })
        console.log("Ended finding all users")
    },
    login: (req, res) => {
        console.log("Started: Logging in the user");
        var token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({
                auth: false,
                message: "You don't have access."
            })
        }
        jwt.verify(token, envConfig.get("JWT_SECRET"), function (err, decoded) {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: err.message
                })
            }
            UserModel.findOne({ userid: req.body.userid }, function (err, user) {
                if (err) {
                    res.send("User doesn't exist");
                } else if (user) {
                    console.log("User exist, verifying password");
                    bcrypt.compareSync(req.body.password, envConfig.get('JWT_SECRET'), (err, isMatch) => {
                        if (err) {
                            res.send({
                                Type: 'Error occured while comparing the passwords',
                                Message: err.message
                            })
                        }
                        console.log('IsMatch'+isMatch);
                        if(req.body.password==user.password){
                            res.send({
                                userExists:true,
                                paswordMatch:true,
                                message: 'Password Matches!'
                            })    
                        }
                        res.send({
                            userExists: 'true',
                            passwordMatch: 'false',
                            message: 'Password Mismatch'
                        })
                    })
                }
            })

        })
        console.log("Ended: User Login")
    }
}