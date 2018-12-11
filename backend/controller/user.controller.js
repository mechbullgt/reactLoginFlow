const UserModel = require('../models/user.model');

// Exporting the controller

module.exports ={
    test:(req,res)=>{
        res.send('Test Successful');
    },
    register:(req, res)=>{
        console.log("Process started to Register a new user");
        let user = new UserModel({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            userid:req.body.userid,
            password:req.body.password,
            role:req.body.role
        });

        // Saving the user to the database
        user.save(function(err){
            if(err){
                return next(err);
            }
            // On success entry to database
            res.send('User registered successfully');
        })
        console.log('Ended user registeration process');
    },
    users:(req,res)=>{
        console.log("Started Finding all users")
        UserModel.find(function(err, users){
            if(err){
                return next(err);
            } 
            res.send(users);
        })
        console.log("Ended finding all users")
    },
    login:(req,res)=>{
        console.log("Started: Logging in the user");
        UserModel.findOne({userid:req.body.userid},function(err, user){
            if(err){
                res.send("User doesn't exist");
            } else if(user){
                console.log("User exist, verifying password");
                if(user.password==req.body.password){
                    res.send("User exists, login success");
                    console.log("Login Success!")
                }
                res.send("Password not correct, please try again.");
            }
            res.send("Invalid userid, please register");
        })
        console.log("Ended: User Login")
    }
}