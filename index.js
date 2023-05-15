const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '1000mb'}));
app.use(bodyParser.json());
app.use(cors())
app.use('/public', express.static('public'));
app.use(function(req, res, next) { //allow cross origin requests
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header("Access-Control-Allow-Origin", "*");
next();
});

const stu = require('./routes/student');
var dbConfig = require('./connectiondb.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


app.use('/students', stu);
mongoose.connect(dbConfig.url,{ useNewUrlParser: true,useUnifiedTopology:true });


app.get('/', function(req, res,next) {
res.send({"message": "Welcome to Student API application."});

});
const PORT = 2020;
console.log(PORT,"PORT")
app.get('/', function(req, res){
console.log("Welcome to Student");
res.json({"message": "Welcome to Student"});

});

mongoose.connection.on('error', function() {
console.log('Could not connect to the database. Exiting now...');
 process.exit();

});
mongoose.connection.once('open', function() {
 console.log("Successfully connected to the database");
});
console.log(PORT)
app.listen(PORT, () => {
console.log('Server is running on PORT ${PORT}');
});