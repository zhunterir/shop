const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userName: String,
    passWord: String, 
    email: String
})


const Admin = mongoose.model('admin', adminSchema);

function validateSignup(req){
    const schema = {
        username: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(16).required(),
        email: joi.string().min(5).max(255).email(),

    }
    return joi.validate(req, schema);
}

function validateSignin(req){
    const chema = {
        username: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(16).required(),
    }
}

exports.Model = Admin;
exports.validateSignin = validateSignin;
exports.validateSignup = validateSignup;