let mongoose = require('mongoose');
let Joi = require('joi');
let commentScheme = new mongoose.Schema({
    id: String,
    name: String,
    comment: String,
});

let Comment = mongoose.model('comment' , commentScheme);

// exports.Comment = 

module.exports = commentScheme;