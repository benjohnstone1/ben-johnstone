// define model =================
var mongoose = require('mongoose');

var uri = 'mongodb://heroku_n2k302mx:u2m8korq51b25f743m1haml9u8@ds161873.mlab.com:61873/heroku_n2k302mx';

mongoose.connect(uri);

var db = mongoose.createConnection(uri, {
  useMongoClient: true,
  /* other options */
});


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {


    var todoSchema = new mongoose.Schema({
        text: String
    });

    mongoose.model('Todo', todoSchema);
});