const mongoose = require('mongoose');
const joi = require('joi');
let userSchema=  new mongoose.Schema({
    name:String,
    password:String,
    email: String,
    address: String,
    phone: Number,
    postalCode: Number,

});

const User =  mongoose.model('user', userSchema);

function validateSignup(req){
    const schema = {
        username: joi.string().min(5).max(255).required(),
        firstname : joi.string().required(),
        lastname : joi.string().required(),
        password: joi.string().min(8).max(16).required(),
        email: joi.string().min(5).max(255).email(),
        address: joi.string().min(5).max(255).required(),
        phone: joi.number().min(11).max(11).required(),
        postalCode: joi.number().min(10).max(10).required()

    }
    return joi.validate(req, schema);
}
function validateSignin(req){
    const schema = {
        username: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(16).required(),
    }
    return joi.validate(req, schema);
}
exports.Model = User;

