// define model =================
var mongoose = require('mongoose');
var todoUserSchema = new mongoose.Schema({
    text: String,
    rank: {
        type: Number,
        default: 0,
    },
    user_id: String,
});
mongoose.model('TodoUser', todoUserSchema);