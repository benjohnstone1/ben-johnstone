var mongoose = require('mongoose');
var uri = 'mongodb://heroku_n2k302mx:u2m8korq51b25f743m1haml9u8@ds161873.mlab.com:61873/heroku_n2k302mx';
//var promise = mongoose.connect('mongodb://localhost/nodewebappdb', {
var promise = mongoose.connect(uri, {
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('We are connected to DB!');
  console.log('https://express-crud-benjiforrest.c9users.io');
});

