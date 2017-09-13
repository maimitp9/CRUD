var Mongoose = require('mongoose');

var db = Mongoose.createConnection('mongodb://127.0.0.1:27017/mydb', function(err, db){
  if(err){
    console.error('connection error');
  }else{
    console.log("Connection with database succeeeded.")
  }
});

exports.db = db;