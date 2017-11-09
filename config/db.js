var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connect to mLab Database
var uri = 'mongodb://heroku_n2k302mx:u2m8korq51b25f743m1haml9u8@ds161873.mlab.com:61873/heroku_n2k302mx';
// connect to db in command line
// $ mongo ds161873.mlab.com:61873/heroku_n2k302mx -u heroku_n2k302mx -p u2m8korq51b25f743m1haml9u8

mongoose.connect(uri, {
  useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // We're connected!
  console.log('We are connected to DB!');
  console.log('Test Enivronment: https://express-crud-benjiforrest.c9users.io');
});

