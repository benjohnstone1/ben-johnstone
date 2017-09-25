/*
Take the data from the submitted form and create a new Mongoose model instance
Call the setPassword method we created earlier to add the salt and the hash to the instance
Save the instance as a record to the database
Generate a JWT
Send the JWT inside the JSON response
*/

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
     if(err){
         // Handle error on save 
     }
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};
