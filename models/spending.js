var root = this;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

root.Schema = new Schema({
    title: { type: String, required: true, 
             unique: true, },
    value: { type: Number, required: true }
});

root.Model = mongoose.model('Spending', root.Schema);

