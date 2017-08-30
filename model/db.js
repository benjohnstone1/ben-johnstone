var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/nodewebappdb', {
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

