var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    about_me: String,
    skills: String,
    admin: {
        type: Boolean,
        default: false
    },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

// define experience model =================
var experienceSchema = new mongoose.Schema({
    overview: String,
    achievements: String,
    fromDate: Date,
    toDate: Date,
    location: String,
    company: String,
    title: String,
    user_id: String,
});
mongoose.model('Experience', experienceSchema);