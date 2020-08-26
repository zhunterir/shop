const mongoose = require('mongoose');
const commentSchema = require('./comment');
const Joi = require("joi");
let productSchema =  new mongoose.Schema({
    id: {type:String, default:'', required:true},
    imgUrl: {type:String, default:''},
    title: {type:String, default:'', index:true},
    price: {type:Number, default:0},
    sale: {type:Number, default:0},
    count: {type:Number, default: 0}, 
    colors: {type:Array, default: []},
    callOrderOnly : {type: String, default: 'off'},
    sellPermit : {type:String, default: 'on'},
    about: {type: String, default:''},
    moreInfo:Array,
    creationDate : {type: Date},
    lastModifiedDate: {type:Date},
    comments: [commentSchema],
    category: {type:String, default:''}});
productSchema.pre('save', function(next){
    let dt = new Date();
    this.lastModifiedDate =dt;
    if (! this.creationDate){
       this.creationDate = dt;
    }
    return next();  
});
const Product = mongoose.model('product', productSchema,'products');
module.exports = Product;


