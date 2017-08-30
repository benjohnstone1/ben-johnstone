var mongoose = require('mongoose');
var accountSchema = new mongoose.Schema({
    name: String,
    currency: String,
    paymentTerm: Number,
    comments: String,
    createdDate: { type: Date, default: Date.Now },
    active: Boolean
});
mongoose.model('Account',accountSchema); 