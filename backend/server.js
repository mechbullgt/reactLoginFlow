var express = require("express");
var login = require('./routes/loginroutes');
var upload = require('./routes/fileroutes');
var bodyParser = require('body-parser');
const database = require('./database/mongodb');

var app = express();
const PORT = 4000;

// Initializing Database
database.databaseInit();

// Assiging test route
const user = require('./routes/user.routes');

/*
Module:multer
multer is middleware used to handle multipart form data
*/
var multer = require('multer');
var multerupload = multer({ dest: 'fileprint/' })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var router = express.Router();

// // test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });

// //route to handle user registration
// router.post('/register',login.register);
// router.post('/login',login.login);
// //route to handle file printing and listing
// router.post('/fileprint',multerupload.any(),upload.fileprint);
// router.get('/fileretrieve',upload.fileretrieve);

app.use('/api', user);
app.listen(PORT);