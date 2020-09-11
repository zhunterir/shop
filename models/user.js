
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const orderSchema = require("./order").schema;
const Joi = require("joi");
let addressSchema = new mongoose.Schema({
    ostan : {type:String, required:true},
    city: {type:String, required:true},
    postalAddress: {type:String, required:true},
    pelak: {type:String, required:true},
    vahed: {type:String},
    postalCode: {type:String, required:true},
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    melli : {type:String, required:true},
    mobile: {type:String, required:true}
})
var usershema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    password : String,
    email : String,
    addresses: [addressSchema],
    mobile : String,
    meliCode : Number,
    orders: [orderSchema] 
})

var User = mongoose.model('user' , usershema)


function validateSignin(req){
    const schema = {
        mobile : Joi.string().length(11).required(),
        password :Joi.string().min(6).max(15).required(),
    };
    return Joi.validate(req , schema);
}

function validateUpdate(req){
    const schema = {
        phone : Joi.string().allow("").length(11),
        password : Joi.string().allow("").min(6).max(15),
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

function validateSignup(req){
    const schema = {
        fname : joi.string().required(),
        lname : joi.string().required(),
        password: joi.string().min(6).max(16).required(),
        repassword: joi.string().min(6).max(16).required(),
        ruleAccept: joi.string().required(),
        mobile: joi.number().min(11).max(11).required(),
        code : joi.number().required()
    }
    return joi.validate(req, schema);
}
// function validateSignin(req){
//     const schema = {
//         username: joi.string().min(5).max(255).required(),
//         password: joi.string().min(8).max(16).required(),
//     }
//     return joi.validate(req, schema);
// }
// exports.Model = User;

