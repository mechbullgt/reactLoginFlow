const mongoose = require('mongoose');
const envConfig = require('../envVars');
const middleware = require('../web/middleware/authorization.middleware');
// const envConfig = rootRequire('envVars.js');

// MonogoDb initalization
function databaseInit(){
    console.log('Connecting to Monogodb');
    const dbVariablesObject = envConfig.get('mongoDb');
    const dbUrl = dbVariablesObject.dburl;
    const collection = dbVariablesObject.collectionName;
    let connectionString = dbUrl+collection;
    console.log('Connection String:'+connectionString);
    const connectionOptions = {
        useNewUrlParser: true
    }

    // Connecting
    mongoose.connect(connectionString,connectionOptions);
    // Connection Success
    mongoose.connection.on('connected',()=>{
        console.log('Connected to database mongodb');
        middleware.checkIntegration();
    })
    // Connection Failure
    mongoose.connection.on('error',console.error.bind(console,'MongoDB Connection Error:'));
}


module.exports= {databaseInit};