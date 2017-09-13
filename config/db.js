// var Mongoose = require('mongoose');

// var db = Mongoose.createConnection('mongodb://localhost/mydb', function(err, db) {
//     if (err) {
//         console.error('connection error');
//     } else {
//         console.log("Connection with database succeeeded.")
//     }
// });

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/mydb';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.db = db;