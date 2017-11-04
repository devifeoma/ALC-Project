var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentSchema   = new Schema({
    name: String,
    regno: String,
    department: String,
    phone: String,
    age: Number,
});

module.exports = mongoose.model('Student', StudentSchema);