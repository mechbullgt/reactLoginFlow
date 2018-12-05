const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the user schema 
// Will be going ahead without timestamp and later would include timestamps
let userSchema = {
    first_name:{type:String, required:true, max:100},
    last_name:{type:String, required:true, max:100},
    userid:{type:String, required:true, max:100},
    password:{type:String, required:true, max:100},
    role:{type:String, required:true, max:100},
}

// Exporting the module for further usage
module.exports = mongoose.model('UserSchema',userSchema);