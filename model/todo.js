// define model =================
var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
    text: String,
    rank: {
        type: Number,
        default: 0,
    }
});
mongoose.model('Todo', todoSchema);