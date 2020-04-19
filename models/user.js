
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Joi = require("joi");


var usershema = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String,
    email : String,
    address : String,
    phone : Number,
    meliCode : Number,
    postalCode : Number,
    Order : {
        id : Number,
        orderDate : Date,
        deliveryPrice : Number,
        totalPrice : Number,
        status : String,
        items : Array   ///this is for products
    }
})

var User = mongoose.model('user' , usershema)



function validateSignup(req){
    const schema = {
        phone : Joi.string().length(11).required(),
        password :Joi.string().min(8).max(15).required(),
        repassword : Joi.ref('password')  
        // username : Joi.string().min(5).max(255).required(),
        // firstName : Joi.string().required(),
        // lastName : Joi.string().required(),
        // password : Joi.string().min(8).max(255).required(),
        // email : Joi.string().min(5).max(255).email(),
        // address : Joi.string().min(5).max(255).required(),
        // phone : Joi.number().min(11).max(11).required(),
        // postalCode : Joi.number().min(10).max(10),
    };
    return Joi.validate(req , schema);
}

function validateSignin(req){
    const schema = {
        phone : Joi.string().length(11).required(),
        password :Joi.string().min(8).max(15).required(),
    };
    return Joi.validate(req , schema);
}

function validateUpdate(req){
    const schema = {
        phone : Joi.string().allow("").length(11),
        password : Joi.string().allow("").min(8).max(15),
        repassword : Joi.ref("password"),
        firstName : Joi.string().allow("").min(5).max(50),
        lastName : Joi.string().allow("").min(5).max(50),
        meliCode : Joi.string().allow("").max(10),
        address : Joi.string().allow("").max(150),
        postalCode : Joi.string().allow("").max(150),
        email : Joi.string().email().allow("").max(150),
        id : Joi.string().required()
    };
    return Joi.validate(req , schema);
}

exports.User = User;
exports.validateSignup = validateSignup;
exports.validateSignin = validateSignin;
exports.validateUpdate = validateUpdate;




///////////////////////////////////////////////////mohammad
// const mongoose = require('mongoose');
// const joi = require('joi');
// let userSchema=  new mongoose.Schema({
//     name:String,
//     password:String,
//     email: String,
//     address: String,
//     phone: Number,
//     postalCode: Number,

// });

// const User =  mongoose.model('user', userSchema);

// function validateSignup(req){
//     const schema = {
//         username: joi.string().min(5).max(255).required(),
//         firstname : joi.string().required(),
//         lastname : joi.string().required(),
//         password: joi.string().min(8).max(16).required(),
//         email: joi.string().min(5).max(255).email(),
//         address: joi.string().min(5).max(255).required(),
//         phone: joi.number().min(11).max(11).required(),
//         postalCode: joi.number().min(10).max(10).required()

//     }
//     return joi.validate(req, schema);
// }
// function validateSignin(req){
//     const schema = {
//         username: joi.string().min(5).max(255).required(),
//         password: joi.string().min(8).max(16).required(),
//     }
//     return joi.validate(req, schema);
// }
// exports.Model = User;

