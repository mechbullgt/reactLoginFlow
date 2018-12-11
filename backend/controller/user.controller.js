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
    
}