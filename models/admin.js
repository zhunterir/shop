
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var adminshema = new mongoose.Schema({
    username : String,
    password : String,
    email : String
})

var Admin = mongoose.model('admin' , adminshema)



function validateSignup(req){
    const schema = {
        username : Joi.string().min(5).max(255).required(),
        password : Joi.string().min(5).max(255).required(),
        email : Joi.string().email().required(),
        repassword : Joi.ref("password")
    };
    return Joi.validate(req , schema);
}

function validateSignin(req){
    const schema = {
        username : Joi.string().max(255).required(),
        password : Joi.string().min(5).max(255).required(),
        _csrf : Joi.string()
    };
    return Joi.validate(req , schema);
}

function validateUpdate(req){
    const schema = {
        username : Joi.string().allow("").min(5).max(255),
        password : Joi.string().allow("").min(8).max(15),
        email : Joi.string().email().allow(""),
        repassword : Joi.ref("password"),
        id : Joi.string().required()
    };
    return Joi.validate(req , schema);
}

exports.Admin = Admin;
exports.validateSignup = validateSignup;
exports.validateSignin = validateSignin;
exports.validateUpdate = validateUpdate;









///////////////////////////////////////////////mohammad
// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//     userName: String,
//     passWord: String, 
//     email: String
// })


// const Admin = mongoose.model('admin', adminSchema);

// function validateSignup(req){
//     const schema = {
//         username: joi.string().min(5).max(255).required(),
//         password: joi.string().min(8).max(16).required(),
//         email: joi.string().min(5).max(255).email(),

//     }
//     return joi.validate(req, schema);
// }

// function validateSignin(req){
//     const chema = {
//         username: joi.string().min(5).max(255).required(),
//         password: joi.string().min(8).max(16).required(),
//     }
// }

// exports.Model = Admin;
// exports.validateSignin = validateSignin;
// exports.validateSignup = validateSignup;